# Step Up Structured Systems — Project Overview

This document details the technical architecture, technology stack, and directory structure of the project.

## 🚀 Technology Stack

### Frontend (Modern React Ecosystem)
A high-performance, responsive web application built with a focus on polished UI/UX.

*   **Core**: [React 18](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
*   **Build System**: [Vite 7](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) with `tailwindcss-animate` for micro-animations.
*   **UI Components**: [Shadcn UI](https://ui.shadcn.com/) (built on [Radix UI](https://www.radix-ui.com/))
*   **Form Management**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) for schema-based validation.
*   **Icons**: [Lucide React](https://lucide.dev/)
*   **State & Data**: [TanStack Query](https://tanstack.com/query/latest) (for future backend integration) and [Sonner](https://sonner.emilkowal.ski/) for toast notifications.
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)

### Backend (Python / FastAPI)
A lightweight, scalable API designed for form submissions and notifications.

*   **Framework**: [FastAPI](https://fastapi.tiangolo.com/)
*   **Asynchronous Processing**: Native Python `asyncio` for non-blocking email firing.
*   **Database**: [SQLAlchemy 2.0](https://www.sqlalchemy.org/) (ORM)
*   **Migrations**: [Alembic](https://alembic.sqlalchemy.org/)
*   **Validation**: [Pydantic v2](https://docs.pydantic.dev/)
*   **Security & Rate Limiting**: [SlowAPI](https://slowapi.readthedocs.io/) (Redis-free rate limiting)
*   **Email Engine**: `aiosmtplib` for asynchronous SMTP support.

---

## 📂 Folder Structure

```text
stepup-structured-systems/
├── backend/                # Python Backend (FastAPI)
│   ├── alembic/            # Database migration history
│   ├── main.py             # API Entry point & Model definitions
│   ├── email_service.py    # Email templates and SMTP logic
│   ├── requirements.txt    # Python dependencies
│   └── alembic.ini         # Alembic configuration
├── public/                 # Static assets (favicons, logos)
├── src/                    # Frontend React source
│   ├── components/         # UI Components & Sections
│   │   ├── ui/             # Reusable Shadcn UI primitives
│   │   ├── Navbar.tsx      # Global Navigation
│   │   ├── HeroSection.tsx # Landing Hero
│   │   └── ...             # Sections (Problem, Approach, etc.)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utility functions (Tailwind merge, etc.)
│   ├── pages/              # Page layouts (Index, NotFound)
│   ├── App.tsx             # Root component & Routing
│   └── main.tsx            # React entry point
├── .env                    # Environment variables (Frontend & Backend)
├── index.html              # HTML shell
├── package.json            # Frontend dependencies & scripts
├── tailwind.config.ts      # Tailwind & Theme configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration
```

---

## 🛠 Setup & Running

- **Frontend**: Runs on `http://localhost:8080` via `npm run dev`.
- **Backend**: Runs on `http://localhost:8010` via `python -m uvicorn main:app --reload`.
- **Database**: Defaults to PostgreSQL, with SQLite fallback for local development.
