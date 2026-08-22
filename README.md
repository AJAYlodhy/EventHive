# 🐝 EventHive — One-College Event Management Platform

EventHive is an AI-powered, single-institution Event Management and Governance Platform designed for universities and colleges. It streamlines the entire event lifecycle from student idea submission through multi-tier faculty reviews and HOD final authorization to campus-wide registration.

---

## 🏛️ Core Workflow

```
COLLEGE STUDENT
      ↓
(Submits Event Request: title, date, time, venue, capacity, purpose, visibility)
      ↓
EVENT COORDINATOR / ORGANIZER
      ↓
(Reviews proposal, checks details, assigns active Faculty Event Host)
      ↓
EVENT HOST / TEACHER
      ↓
(Checks date, start/end time, venue schedule collisions & approves for HOD review)
      ↓
HOD / ADMIN
      ↓
(Final approval authority; conflict override management; publishes event live)
      ↓
APPROVED / PUBLISHED EVENT
      ↓
COLLEGE STUDENTS / PUBLIC USERS
      ↓
(One-click registration, capacity tracking, duplicate prevention)
```

---

## 👥 The 5 Roles & Permissions

| Role | Responsibility & Permissions | Portals & Endpoints |
|---|---|---|
| **1. HOD / Admin** | Highest-level authority. Has **final event approval authority**. Reviews Host-approved events, manages schedule conflict alerts and overrides, audits system actions, and oversees users, hosts, venues, and providers. | `/admin/dashboard`<br>`/admin/events`<br>`/admin/conflicts`<br>`/admin/venues`<br>`/admin/hosts`<br>`/admin/audit-logs` |
| **2. Event Host / Teacher** | Multiple faculty mentors across departments (e.g. Dr. Rajesh Sharma, Prof. Anita Roy). Performs date/time/venue conflict verification, approves proposals for HOD review, or requests changes. | `/api/host/dashboard`<br>`/api/host/events`<br>`/api/host/check-conflict`<br>`/api/host/events/:id/approve` |
| **3. Event Coordinator / Organizer** | Student coordinators managing incoming student proposals. Verifies event purpose and expected attendance, selects and assigns an active Event Host from the faculty directory. | `/api/coordinator/requests`<br>`/api/coordinator/events/:id/assign-host`<br>`/api/organizer/*` |
| **4. College Student** | Verified student (`@college.edu` domain or roll number). Can browse both `COLLEGE_ONLY` and `PUBLIC` approved events, register for events, cancel registrations, submit new event requests, and track approval timeline. | `/api/student/event-requests`<br>`/api/student/profile`<br>`/api/events`<br>`/api/registrations` |
| **5. External / Public User** | Unverified visitor. Can browse and view ONLY `PUBLIC` campus events. Backend strictly enforces `403 Forbidden` for `COLLEGE_ONLY` events or internal audit data. | `/api/events` (Filtered to `PUBLIC`) |

---

## ⚠️ Date, Time & Venue Conflict Detection Engine

The platform automatically detects venue collisions before Host and HOD approvals:
* **Detection Criteria**: Same date, same campus venue, overlapping time interval (`(reqStart < existEnd && reqEnd > existStart)`).
* **Collision Alert**: Displays conflicting event title, booking hours, organizer, and assigned host.
* **HOD Conflict Override**: If an event must proceed despite a conflict (e.g. multi-stage auditorium usage), HOD can grant an administrative override by providing an `overrideReason`, which is immutably recorded in the system **Audit Log**.

---

## 🔒 Event Visibility

* **`COLLEGE_ONLY`**: Restricts event details and registration to verified college students and staff. External requests to view or register return `403 Forbidden`.
* **`PUBLIC`**: Open for discovery by external community members, guest speakers, and prospective students.

---

## 🚀 Quick Start Guide

### 1. Start Unified Backend Server & HOD Admin Panel
```bash
npm install
npm start
# OR
cd backend
npm install
npm start
```
* **Server Root**: `http://localhost:5000`
* **HOD / Admin Portal**: `http://localhost:5000/admin/dashboard`
* **API Health Check**: `http://localhost:5000/api/health`

### 2. Run Automated Test Suite (All 25 Workflow Tests)
```bash
npm test
```

### 3. Start Frontend App (React SPA)
```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Demo Accounts & Credentials

| Role | Name | Email | Password |
|---|---|---|---|
| **HOD / Admin** | Dr. Arthur Pendelton | `admin@eventhive.com` | `admin123` |
| **Event Host (CS)** | Dr. Rajesh Sharma | `rajesh.sharma@college.edu` | `password123` |
| **Event Host (ECE)** | Prof. Anita Roy | `anita.roy@college.edu` | `password123` |
| **Coordinator** | Alex Rivera | `alex.organizer@eventhive.com` | `organizer123` |
| **Student** | Aashish Kumawat | `aashish.student@eventhive.edu` | `password123` |
| **Public User** | Guest Visitor | `guest@external.com` | `password123` |
