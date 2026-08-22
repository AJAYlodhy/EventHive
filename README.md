# 🐝 EventHive – Campus Event Management & Ticketing Platform

EventHive is a modern web application for discovering, managing, and registering for campus hackathons, technical workshops, cultural fests, sports tournaments, and seminars.

---

## 🧩 Modules

### Student Dashboard (`feature/student`)

The Student Dashboard provides a seamless, responsive portal for campus students to:

- **Dashboard / Home**: View personalized greeting, active registration statistics, upcoming events, and featured campus activities.
- **Browse Events**: Search events with filters for Category, Department, and Date.
- **Event Registration**: Register for campus events with seat capacity tracking and duplicate registration prevention.
- **My Events**: Track confirmed upcoming events, view schedules & venues, and manage/cancel registrations.
- **Student Profile**: View and edit student details such as Name, Roll Number, Department, Semester, Academic Year, and Bio.
- **Notifications**: Receive registration confirmations, reminders, and announcements.

### Admin Panel (`feature/admin`)

The Admin Panel provides a comprehensive management workspace for college administrators to oversee users, organizers, event approval pipelines, vendor proposals, reports, and campus notifications.

Admin features include:

- Admin login and session-based authentication
- User management
- Student and organizer management
- Event approval and rejection
- Service provider/vendor management
- Vendor application management
- Notifications
- Reports and engagement analytics

### Organizer Module (`feature/organizer`)

The Organizer module allows event organizers to manage campus events and participants.

Organizer features include:

- Organizer dashboard
- Event creation and management
- Event details and scheduling
- Participant management
- Registration tracking
- Event status management
- Notifications

---

## 🛠️ Tech Stack

### Admin Panel

- **Backend:** Node.js + Express.js
- **View Engine:** EJS
- **Styling:** Vanilla CSS with CSS Custom Properties
- **Architecture:** MVC
- **Authentication:** Session-Based Admin Authentication & Protected Route Middleware

### Student Dashboard

- **Frontend:** React 18
- **Backend:** Node.js + Express.js REST API
- **Styling:** Responsive web interface
- **API:** REST API with local fallback support

### Organizer Module

- **Backend:** Node.js + Express.js
- **Frontend:** HTML/CSS/JavaScript
- **Architecture:** MVC / REST-based architecture

---

## 📁 Project Structure

```text
EVENTHIVE/

├── backend/
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── index.html
│   ├── package.json
│   └── src/
│       └── services/
│           └── api.js
│
├── public/
│   ├── css/
│   │   ├── admin.css
│   │   └── ...
│   └── js/
│       ├── admin.js
│       └── ...
│
├── src/
│   ├── controllers/
│   │   └── adminController.js
│   │
│   ├── middleware/
│   │   └── auth.js
│   │
│   ├── data/
│   │   └── mockData.js
│   │
│   ├── routes/
│   │   └── adminRoutes.js
│   │
│   └── views/
│       ├── layouts/
│       │   └── adminLayout.ejs
│       │
│       └── admin/
│           ├── login.ejs
│           ├── dashboard.ejs
│           ├── users.ejs
│           ├── organizers.ejs
│           ├── events.ejs
│           ├── providers.ejs
│           ├── applications.ejs
│           ├── notifications.ejs
│           └── reports.ejs
│
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md