# 🐝 EventHive – Admin Panel (`feature/admin`)

**College Event Management Platform — Administrative Management Module**

EventHive Admin Panel provides a comprehensive, responsive management workspace for college administrators to oversee users, student organizers, event approval pipelines, vendor proposals, reports, and campus notifications.

---

## 🛠️ Tech Stack

- **Backend:** Node.js + Express.js
- **View Engine:** EJS (Embedded JavaScript Templates)
- **Styling:** Vanilla CSS with CSS Custom Properties
- **Architecture:** MVC (Model/Mock Data, Views, Controllers, Middleware)
- **Authentication:** Session-Based Admin Authentication & Protected Route Middleware

---

## 📁 Project Structure

```
EVENTHIVE/
├── server.js                  # Express app entry point
├── package.json               # Dependencies and scripts
├── .env.example               # Environment variable template
├── .gitignore                 # Git ignore rules
├── public/                    # Static assets
│   ├── css/
│   │   └── admin.css          # Admin panel design system & styles
│   └── js/
│       └── admin.js           # Admin client-side JS & interactions
└── src/
    ├── controllers/
    │   └── adminController.js # Complete Admin controller actions
    ├── middleware/
    │   └── auth.js            # Admin authentication & session protection
    ├── data/
    │   └── mockData.js        # Data store (ready for DB layer integration)
    ├── routes/
    │   └── adminRoutes.js     # Admin route definitions
    └── views/
        ├── layouts/
        │   └── adminLayout.ejs  # Base Admin Layout with Sidebar & Topnav
        └── admin/
            ├── login.ejs        # Admin Login Page
            ├── dashboard.ejs    # KPI Statistics & Pending Approvals
            ├── users.ejs        # User Management (Students, Organizers)
            ├── organizers.ejs   # Club & Organizer Approvals
            ├── events.ejs       # Campus Event Approvals & Pipeline
            ├── providers.ejs    # Service Provider & Vendor Verification
            ├── applications.ejs # Event Vendor Proposals Management
            ├── notifications.ejs# Admin Notifications Inbox
            └── reports.ejs      # Reports, Analytics & Engagement Metrics
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
# or
npm start
```

The application runs on `http://localhost:5000`.

---

## 🔑 Admin Routes & Features

| Route | Method | Description |
|---|---|---|
| `/admin/login` | `GET` / `POST` | Admin authentication page (Default dev: `admin@eventhive.com` / `admin123`) |
| `/admin/logout` | `GET` | Clear session and log out |
| `/admin/dashboard` | `GET` | Dashboard with KPIs, recent events, and approval queue |
| `/admin/users` | `GET` | User list with search, role filters, status toggles, and deletion |
| `/admin/organizers` | `GET` | Student clubs & organizers verification management |
| `/admin/events` | `GET` | Campus events pipeline (Approve, Reject, Delete) |
| `/admin/providers` | `GET` | Service vendor management (Hotels, Catering, Sound, Decor) |
| `/admin/applications` | `GET` | Event proposals management from vendors |
| `/admin/notifications` | `GET` | Administrative alerts and mark-as-read inbox |
| `/admin/reports` | `GET` | Engagement analytics, department breakdowns, and category stats |
