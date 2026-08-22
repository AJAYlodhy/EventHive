# 🐝 EventHive — AI-Powered Campus Event Management & Ticketing Platform

EventHive is a unified, collaborative event management platform connecting **Students**, **Organizers**, and **Administrators** for college hackathons, technical workshops, cultural fests, sports tournaments, and conferences.

---

## 🧩 Core Modules

### 1. 🎓 Student Dashboard Module
* **Dashboard / Home**: Personalized student welcome, registration overview, upcoming campus events, and quick actions.
* **Browse Events**: Real-time event catalog with search, department filtering, category tags, and schedule info.
* **Event Registration**: One-click event registration, live seat availability tracking, and duplicate prevention.
* **My Events**: View confirmed event registrations, venues, dates, and cancel registrations.
* **Student Profile**: View and edit student details (Name, Roll Number, Department, Semester, Year, Bio).
* **Notifications**: Registration confirmations, event reminders, and announcements.

### 2. 🏢 Organizer / Host Module
* **Organizer Dashboard**: Live event statistics (Total Events, Active Registrations, Attendance, Revenue), quick creation shortcut, and recent activity feed.
* **Event Creation & Management**: Multi-step event creation with custom categories, tags, ticketing types, capacity limits, and banner images.
* **Event Details & Attendance**: Detailed event view, edit forms, real-time registration lists, search & filter participants, CSV attendee export, and QR code check-in attendance recording.
* **Organizer Profile**: Manage club affiliation, contact details, social links, and organizer bio.
* **Authentication**: JWT & session authentication with role verification for organizers.

### 3. 🛡️ Admin Panel Module
* **Admin Dashboard**: System-wide KPIs (Active Users, Registered Organizers, Pending Approvals, Service Providers, Proposals), and quick approval queues.
* **User Management**: Search, filter by role (Student, Organizer), activate/deactivate accounts, and delete users with confirmation.
* **Organizer Verification**: Review student club & organizer registrations, approve or reject applications.
* **Event Moderation**: Review, approve, reject, or unpublish campus events before they go live.
* **Service Provider & Vendor Management**: Manage external vendors (Hotels, Catering, Sound & Light, Tent & Staging, Photography) and proposals.
* **Reports & Analytics**: Visual category breakdowns, monthly engagement trends, and departmental participation statistics.
* **Admin Notifications**: Real-time administrative notices with unread badge counter and mark-as-read controls.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js, MongoDB (Mongoose with automatic In-Memory Store fallback)
* **Frontend:** React 18, Vite, Tailwind CSS, Lucide Icons, React Router
* **Admin Panel:** Express, EJS Templating, Vanilla JavaScript, Vanilla CSS
* **Authentication:** JWT (JSON Web Tokens) for Organizer/Student REST APIs + Session Cookies for Admin Panel

---

## 📁 Project Structure

```
EVENTHIVE/
├── backend/
│   ├── config/
│   │   └── db.js                  # Database connection with graceful in-memory fallback
│   ├── controllers/
│   │   ├── authController.js      # Auth controller (Register, Login, Profile)
│   │   └── organizerController.js # Organizer events, registrations, export & stats
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT authentication middleware
│   ├── models/
│   │   ├── Event.js               # Mongoose Event schema
│   │   ├── Registration.js        # Mongoose Registration schema
│   │   ├── User.js                # Mongoose User schema
│   │   └── store.js               # Built-in in-memory data store for standalone execution
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth routes
│   │   └── organizerRoutes.js     # /api/organizer routes
│   ├── test/
│   │   └── api.test.js            # Automated backend tests
│   ├── package.json               # Backend dependencies and scripts
│   └── server.js                  # Unified backend server entry point
│
├── frontend/
│   ├── public/                    # Static assets and favicon
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/            # Badge, Modal, StatCard reusable components
│   │   │   └── layout/            # Navbar, Sidebar, OrganizerLayout
│   │   ├── context/
│   │   │   └── AuthContext.jsx    # React authentication context
│   │   ├── pages/
│   │   │   ├── auth/              # Login and Register pages
│   │   │   └── organizer/         # Dashboard, ManageEvents, CreateEvent, EditEvent, etc.
│   │   ├── services/
│   │   │   ├── api.js             # Unified API client (Student + Organizer)
│   │   │   └── organizerService.js# Organizer API service methods
│   │   ├── App.jsx                # React route configuration
│   │   ├── main.jsx               # React entry point
│   │   └── index.css              # Tailwind and global styles
│   ├── index.html                 # Frontend HTML entry point
│   ├── package.json               # Frontend dependencies and scripts
│   └── vite.config.js             # Vite configuration with API proxy
│
├── src/
│   ├── controllers/
│   │   └── adminController.js     # Admin controller actions
│   ├── middleware/
│   │   └── auth.js                # Admin session auth middleware
│   ├── data/
│   │   └── mockData.js            # Admin mock data store
│   ├── routes/
│   │   └── adminRoutes.js         # Admin route endpoints
│   └── views/
│       ├── layouts/
│       │   └── adminLayout.ejs    # Base Admin layout with sidebar
│       └── admin/                 # EJS views for Admin Dashboard, Users, Events, etc.
│
├── public/                        # Public assets for Admin Panel (admin.css, admin.js)
├── server.js                      # Root server entrypoint
├── package.json                   # Root package configuration
├── .gitignore                     # Git ignore rules
└── README.md                      # Project documentation
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- npm (comes bundled with Node.js)

### 2. Start the Backend API & Admin Panel
```bash
# From project root:
npm install
npm start
# OR from backend folder:
cd backend
npm install
npm start
```
* **Unified API Server**: `http://localhost:5000`
* **Admin Panel**: `http://localhost:5000/admin/dashboard`
* **API Health Check**: `http://localhost:5000/api/health`

### 3. Start the Frontend App (Student & Organizer)
```bash
# In a separate terminal:
cd frontend
npm install
npm run dev
```
* **Frontend Web App**: `http://localhost:3000` or `http://localhost:5173`

---

## 🔑 Demo Credentials

| Role | Portal / URL | Email | Password |
|---|---|---|---|
| **Admin** | `http://localhost:5000/admin/login` | `admin@eventhive.com` | `admin123` |
| **Organizer** | `http://localhost:3000/login` | `alex.organizer@eventhive.com` | `organizer123` |
| **Student** | `http://localhost:3000/login` | `aashish.student@eventhive.edu` | (One-click login / guest) |

---

## 📡 API Endpoints Overview

### Authentication (`/api/auth`)
* `POST /api/auth/register` — Register a new organizer or student
* `POST /api/auth/login` — Login and receive JWT access token
* `GET /api/auth/me` — Retrieve current authenticated user profile
* `PUT /api/auth/profile` — Update user profile information

### Organizer Management (`/api/organizer`)
* `GET /api/organizer/dashboard` — Overview statistics and recent activity
* `GET /api/organizer/events` — List organizer events (with search, category, status filter)
* `POST /api/organizer/events` — Create a new campus event
* `GET /api/organizer/events/:id` — Get event details
* `PUT /api/organizer/events/:id` — Update event details
* `DELETE /api/organizer/events/:id` — Delete an event
* `GET /api/organizer/events/:id/registrations` — View event attendee registrations
* `POST /api/organizer/events/:id/attendance` — Check-in attendee by registration ID / QR
* `GET /api/organizer/events/:id/export` — Export attendee list as CSV

### Student Campus Events (`/api/events`)
* `GET /api/events` — Browse campus events (with search, category, department filters)
* `GET /api/events/:id` — View specific event details
* `GET /api/registrations/my-events` — View student's registered events
* `POST /api/registrations` — Register for a campus event
* `DELETE /api/registrations/:eventId` — Cancel event registration
* `GET /api/student/profile` — Get student profile
* `PUT /api/student/profile` — Update student profile
* `GET /api/notifications` — Get notifications

### Admin Panel (`/admin/*`)
* `GET /admin/dashboard` — KPI statistics and approval queues
* `GET /admin/users` — User management (search, filter, activate/deactivate, delete)
* `GET /admin/organizers` — Club and organizer verification
* `GET /admin/events` — Event moderation pipeline (approve, reject, delete)
* `GET /admin/providers` — Service vendor verification (Hotels, Catering, Sound, Tents)
* `GET /admin/applications` — Vendor proposals review
* `GET /admin/reports` — Analytics, category distribution, departmental activity
* `GET /admin/notifications` — Administrative alerts
