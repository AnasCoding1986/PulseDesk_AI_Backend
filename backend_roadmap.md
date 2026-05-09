# Phase 8: Backend Architecture Roadmap 🏗️

This roadmap outlines the transition of **PulseDesk AI** from a mock-data driven prototype to a robust, production-grade full-stack application.

## 📁 Proposed Architecture
We will follow a modular, service-oriented architecture to ensure scalability and maintainability.

```text
server/
├── src/
│   ├── config/          # Database & Environment config
│   ├── controllers/     # Route handlers (Request/Response logic)
│   ├── middleware/      # Auth, Error, Role, Validation middlewares
│   ├── models/          # Mongoose Schemas (Data Definitions)
│   ├── routes/          # Express Route definitions
│   ├── services/        # Business logic (DB operations)
│   ├── utils/           # Shared helpers (AppError, catchAsync)
│   ├── app.ts           # Express App initialization
│   └── server.ts        # Entry point (Server start)
├── .env                 # Secret keys & environment variables
├── package.json         # Backend dependencies
└── tsconfig.json        # TypeScript configuration
```

---

## 🚀 Development Phases

### 1. Foundation & Configuration 🛠️
- Initialize Node.js project with TypeScript in `server` folder.
- Configure `dotenv`, `cors`, `helmet`, and `morgan`.
- Set up MongoDB connection using Mongoose.
- Implement central error handling (`AppError` class and global error middleware).

### 2. Identity & Security 🔐
- Define **User** and **Workspace** models.
- Implement **JWT Authentication** (Login/Register).
- Build `authMiddleware` to protect private routes.
- Build `roleMiddleware` for RBAC (Role-Based Access Control: Owner, Admin, Member).

### 3. Core Data Modeling 📦
- Define Mongoose schemas for:
  - **Projects**: Linked to Workspaces and Clients.
  - **Clients**: Linked to Workspaces.
  - **Tasks**: Linked to Projects and Assignees.
  - **Reports**: AI-generated report storage.

### 4. Modular API Development 📡
- Build RESTful endpoints for all modules.
- Implement **Service Layer** to separate business logic from controllers.
- Add request validation using `Zod`.

### 5. Seeding & Realism 🧪
- Create a `seed.ts` script to populate the database with the rich mock data currently used in the frontend.
- Ensure cross-entity relationships are correctly mapped (e.g., Tasks belonging to Projects).

### 6. Analytics & AI Logic 🧠
- Implement backend services for analytics calculation (Revenue, Workload, Project Health).
- Add "AI Summary" generation endpoints (simulated for now, ready for LLM integration).

---

## 🛠️ Technology Stack
- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT, BcryptJS, Helmet
- **Validation**: Zod
- **Documentation**: Swagger/Postman (Planned)

---

## 📝 Next Steps
1. Create `server` folder and initialize `package.json`.
2. Configure TypeScript and project structure.
3. Start with **Step 1: Foundation & Config**.

> [!IMPORTANT]
> The frontend will remain pointed to mock data initially. Once the backend is stable, we will perform a "Switch-over" phase where the frontend stores are updated to fetch from the real API.
