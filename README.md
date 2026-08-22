# EventHive – Campus Event Management & Ticketing Platform

EventHive is a modern web application for discovering, managing, and registering for campus hackathons, technical workshops, cultural fests, sports tournaments, and seminars.

---

## Student Dashboard Module (`feature/student`)

The Student Dashboard provides a seamless, responsive portal for campus students to:
- **Dashboard / Home**: View personalized greeting, active registration statistics, upcoming events, and featured campus activities.
- **Browse Events**: Search events in real-time with filters for Category (Technical, Cultural, Workshop, Seminar, Sports), Department, and Date.
- **Event Registration**: Register for campus events with seat capacity tracking and duplicate registration prevention.
- **My Events**: Track confirmed upcoming events, view schedules & venues, and manage/cancel registrations.
- **Student Profile**: View and edit student details (Name, Roll Number, Department, Semester, Academic Year, Bio).
- **Notifications**: Campus alerts for registration confirmations, reminders, and announcements with mark-as-read controls.

---

## Project Structure

```
EventHive/
├── backend/
│   ├── package.json
│   └── server.js            # Express REST API (Events, Registrations, Profile, Notifications)
├── frontend/
│   ├── index.html           # Full Responsive React 18 Student Dashboard Application
│   ├── package.json         # Frontend configuration
│   └── src/
│       └── services/
│           └── api.js       # Client API service layer with local fallback
├── .env.example
└── README.md
```

---

## How to Run

### 1. Frontend (Student Portal)
Open `frontend/index.html` directly in any web browser or via VS Code Live Server / static server.

### 2. Backend REST API (Optional)
```bash
cd backend
npm install
npm start
```
The API server will run at `http://localhost:5000`.

---

## API Endpoints (Student)

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/events` | Retrieve campus events (supports search, category, department, date queries) |
| `GET` | `/api/events/:id` | Get details for a specific event |
| `GET` | `/api/student/profile` | Get current student profile |
| `PUT` | `/api/student/profile` | Update student profile details |
| `GET` | `/api/registrations/my-events` | Get list of student's registered events |
| `POST` | `/api/registrations` | Register for an event (`{ eventId }`) |
| `DELETE` | `/api/registrations/:eventId` | Cancel an active event registration |
| `GET` | `/api/student/stats` | Retrieve event attendance statistics |
| `GET` | `/api/notifications` | Get student campus notifications |
| `PUT` | `/api/notifications/mark-read` | Mark all notifications as read |
