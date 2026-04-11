# TechNas

**Live Website:** [https://tech-nas.vercel.app](https://tech-nas.vercel.app)

**GitHub Repository:** [https://github.com/skulk2545/TechNas](https://github.com/skulk2545/TechNas)

---

# Project Overview

TechNas is a scalable solution designed to simplify technology integration and enhance productivity for businesses of all sizes. The project aims to provide users with a seamless interface for managing their technology stacks efficiently.

---

# 🚀 Technology Stack

- **Frontend:** React 18 with TypeScript, Vite, Tailwind CSS, Shadcn UI
- **Backend:** FastAPI (Python), SQLAlchemy ORM, PostgreSQL
- **Database:** PostgreSQL (or SQLite for development)
- **Deployment:** Vercel (Frontend), Docker (Backend)
- **Additional Tools:** React Hook Form, Zod validation, TanStack Query, Framer Motion

---

# 📂 Project Structure

```
TechNas/
├── backend/                 # Python FastAPI backend
│   ├── alembic/            # Database migrations
│   ├── main.py             # API entry point
│   ├── email_service.py    # Email templates & SMTP logic
│   └── requirements.txt    # Python dependencies
├── src/                    # Frontend React application
│   ├── components/         # React components
│   │   ├── ui/            # Shadcn UI primitives
│   │   ├── Navbar.tsx     # Navigation component
│   │   └── ...            # Page sections
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page layouts
│   ├── App.tsx            # Root component & routing
│   └── main.tsx           # React entry point
├── public/                # Static assets
├── .env                   # Environment variables
├── index.html             # HTML shell
├── package.json           # Frontend dependencies
├── tailwind.config.ts     # Tailwind configuration
├── tsconfig.json          # TypeScript config
├── vite.config.ts         # Vite configuration
└── TECH_STACK.md          # Technical documentation
```

---

# ⚡ Getting Started Guide

## Prerequisites
- **Node.js** 16+ (for frontend)
- **Python** 3.9+ (for backend)
- **PostgreSQL** (or SQLite for local development)

## Frontend Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/skulk2545/TechNas.git
   cd TechNas
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:8080`

4. **Build for production:**
   ```bash
   npm run build
   ```

## Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run migrations:**
   ```bash
   alembic upgrade head
   ```

5. **Start the API server:**
   ```bash
   python -m uvicorn main:app --reload --host 0.0.0.0 --port 8010
   ```
   The API will be available at `http://localhost:8010`

---

# 🧪 Testing

Run tests for the frontend:
```bash
npm run test          # Run tests once
npm run test:watch   # Run tests in watch mode
```

---

# 🔍 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run build:dev` | Build in development mode |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint checks |
| `npm run test` | Run unit tests |
| `npm run test:watch` | Run tests in watch mode |

---

# 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Frontend (if needed)
VITE_API_URL=http://localhost:8010

# Backend
DATABASE_URL=postgresql://user:password@localhost/technas
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

---

# 📦 Key Features

✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
✅ **Form Validation** - Robust schema validation with Zod
✅ **Type Safety** - Full TypeScript coverage
✅ **Modern Animations** - Smooth micro-interactions with Framer Motion
✅ **Accessible Components** - Built with Radix UI accessibility standards
✅ **Dark Mode Ready** - Theme support via next-themes
✅ **Toast Notifications** - Beautiful in-app notifications with Sonner
✅ **API Integration** - TanStack Query for efficient server state management
✅ **User Authentication** - Secure authentication and authorization
✅ **Real-time Data Processing** - Live updates and notifications
✅ **Intuitive Dashboard** - Comprehensive user insights and analytics

---

# 🤝 Contributing Guidelines

We welcome contributions! Please follow these steps:

1. **Fork the repository**
   ```bash
   git clone https://github.com/skulk2545/TechNas.git
   ```

2. **Create a new branch**
   ```bash
   git checkout -b feature/YourFeature
   ```

3. **Make your changes and commit**
   ```bash
   git commit -m 'Add some amazing feature'
   ```

4. **Push to the branch**
   ```bash
   git push origin feature/YourFeature
   ```

5. **Create a Pull Request**
   - Open a PR on GitHub with a clear description of your changes

---

# 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

# 📧 Support

For any inquiries or support, please:
- 📧 Email: support@technas.com
- 🐛 Report Issues: [GitHub Issues](https://github.com/skulk2545/TechNas/issues)
- 💬 Start a Discussion: [GitHub Discussions](https://github.com/skulk2545/TechNas/discussions)

---

**Built with ❤️ by the TechNas team**