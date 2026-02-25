from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from sqlalchemy_utils import database_exists, create_database
from pydantic import BaseModel, EmailStr, constr
from datetime import datetime
import asyncio
import os
import re
from dotenv import load_dotenv
from fastapi import Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from fastapi.responses import JSONResponse
from email_service import send_team_alert, send_user_confirmation

# Load backend environment variables
load_dotenv()

# Setup Rate Limiter using client IP address
limiter = Limiter(key_func=get_remote_address)

# Database Configuration
# Default postgres local setup, modify credentials if using a different setup.
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql:///landing_page")
engine = create_engine(DATABASE_URL)

# Create database if it doesn't exist
if not database_exists(engine.url):
    create_database(engine.url)
    print("Database 'landing_page' created.")

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# SQLAlchemy Model
class Submission(Base):
    __tablename__ = "submissions"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    mobile_number = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

# Pydantic Schemas for Validation
class SubmissionCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    mobile_number: str

    @classmethod
    def validate_mobile(cls, v):
        if not re.match(r"^\+?1?\d{9,15}$", v):
            raise ValueError("Invalid mobile number format")
        return v
        
class SubmissionResponse(SubmissionCreate):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True

# FastAPI App setup
app = FastAPI(title="StepUp Landing Page API")

# Initialize SlowAPI Limiter state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Custom Middleware for Security Headers
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-XSS-Protection"] = "1; mode=block"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    return response

# Setup CORS to accept requests from our Vite React frontend
frontend_urls = os.getenv("FRONTEND_URL", "http://localhost:5173,http://localhost:8080,http://127.0.0.1:8080").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[url.strip() for url in frontend_urls if url.strip()], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def _fire_emails(first_name: str, last_name: str, email: str, mobile_number: str, submission_id: int):
    """Send both emails silently — failures are logged but never surface to the user."""
    import logging
    logger = logging.getLogger(__name__)
    try:
        await send_team_alert(
            first_name=first_name,
            last_name=last_name,
            email=email,
            mobile_number=mobile_number,
            submission_id=submission_id,
        )
    except Exception as exc:
        logger.error("Team alert email failed: %s", exc)
    try:
        await send_user_confirmation(
            first_name=first_name,
            last_name=last_name,
            email=email,
        )
    except Exception as exc:
        logger.error("User confirmation email failed: %s", exc)


@app.post("/api/consultation", response_model=SubmissionResponse)
@limiter.limit("5/minute")
async def create_consultation(request: Request, submission: SubmissionCreate, db: Session = Depends(get_db)):
    # --- Persist to DB ---
    try:
        db_submission = Submission(
            first_name=submission.first_name,
            last_name=submission.last_name,
            email=submission.email,
            mobile_number=submission.mobile_number,
        )
        db.add(db_submission)
        db.commit()
        db.refresh(db_submission)
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))

    # --- Fire emails in background (DB already committed safely above) ---
    asyncio.create_task(
        _fire_emails(
            first_name=submission.first_name,
            last_name=submission.last_name,
            email=submission.email,
            mobile_number=submission.mobile_number,
            submission_id=db_submission.id,
        )
    )

    return db_submission

@app.get("/api/health")
def health_check():
    return {"status": "ok", "database": "connected" if database_exists(engine.url) else "disconnected"}
