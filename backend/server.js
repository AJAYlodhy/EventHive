const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database if URI available (fallback in-memory store is automatic)
connectDB();

// View Engine Setup for Admin Panel (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'src', 'views'));

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parsing with clean JSON error handling
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static Assets (for Admin Panel and Static Frontend Assets)
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Middleware to catch JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'Malformed JSON payload received.',
    });
  }
  next(err);
});

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'EventHive Unified Backend API',
    timestamp: new Date().toISOString(),
    modules: {
      admin: 'Active (EJS MVC at /admin)',
      student: 'Active (REST APIs at /api/events, /api/registrations, /api/student)',
      organizer: 'Active (REST APIs at /api/organizer, /api/auth)',
    },
  });
});

// --- MOUNT ROUTES ---

// 1. Auth Routes (Organizer & User auth)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// 2. Organizer Routes (Events CRUD, Registrations, Analytics, QR Attendance, Export)
const organizerRoutes = require('./routes/organizerRoutes');
app.use('/api/organizer', organizerRoutes);

// 3. Admin Routes (Admin EJS Dashboard, User Management, Approvals, Reports)
try {
  const adminRoutes = require('../src/routes/adminRoutes');
  app.use('/admin', adminRoutes);
} catch (e) {
  console.warn('Admin routes notice:', e.message);
}

// 4. Student & Campus Events API Endpoints
const store = require('./models/store');

// In-Memory Student Profile State
let studentProfile = {
  id: "STU-2026-042",
  name: "Aashish Kumawat",
  email: "aashish.student@eventhive.edu",
  rollNumber: "23BCS10142",
  department: "Computer Science & Engineering",
  year: "3rd Year",
  semester: "6th Semester",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  bio: "Passionate developer, tech enthusiast, and active participant in campus hackathons and coding clubs."
};

let studentNotifications = [
  {
    id: "NOTIF-1",
    title: "Registration Confirmed!",
    message: "You have successfully registered for 'HackHive 2026: Annual Campus Hackathon'.",
    date: "2026-08-20",
    read: false,
    type: "registration"
  },
  {
    id: "NOTIF-2",
    title: "Event Reminder",
    message: "Upcoming: 'Tech Career & Internship Readiness Seminar' on August 28th.",
    date: "2026-08-22",
    read: false,
    type: "reminder"
  },
  {
    id: "NOTIF-3",
    title: "New Event Announced",
    message: "AI & Deep Learning Hands-on Workshop is now open for registrations.",
    date: "2026-08-19",
    read: true,
    type: "announcement"
  }
];

// Student Profile Endpoints
app.get('/api/student/profile', (req, res) => {
  res.json(studentProfile);
});

app.put('/api/student/profile', (req, res) => {
  const { name, email, rollNumber, department, year, semester, bio } = req.body;
  studentProfile = {
    ...studentProfile,
    ...(name && { name }),
    ...(email && { email }),
    ...(rollNumber && { rollNumber }),
    ...(department && { department }),
    ...(year && { year }),
    ...(semester && { semester }),
    ...(bio && { bio })
  };
  res.json({ success: true, message: 'Profile updated successfully', profile: studentProfile });
});

// Student Events List & Details
app.get('/api/events', (req, res) => {
  const { category, department, search } = req.query;
  let allEvents = store.events.map(e => ({
    id: e._id || e.id,
    title: e.title,
    category: e.category,
    department: e.department || 'All',
    description: e.description,
    date: e.date ? new Date(e.date).toISOString().split('T')[0] : '2026-09-15',
    time: e.time || '10:00 AM - 04:00 PM',
    venue: e.location || e.venue || 'Campus Auditorium',
    organizer: e.organizerName || e.organizer || 'Campus Club',
    totalSeats: e.capacity || e.totalSeats || 100,
    availableSeats: Math.max(0, (e.capacity || 100) - (e.registeredCount || 0)),
    eventType: e.type || e.eventType || 'In-Person',
    status: e.status || 'Upcoming',
    image: e.bannerImage || e.image || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80'
  }));

  if (category && category !== 'All') {
    allEvents = allEvents.filter(e => e.category && e.category.toLowerCase() === category.toLowerCase());
  }

  if (department && department !== 'All') {
    allEvents = allEvents.filter(e => e.department === department || e.department === 'All');
  }

  if (search) {
    const q = search.toLowerCase();
    allEvents = allEvents.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q)
    );
  }

  res.json(allEvents);
});

app.get('/api/events/:id', (req, res) => {
  const event = store.events.find(e => (e._id === req.params.id || e.id === req.params.id));
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
});

// Student Registrations Endpoints
app.get('/api/registrations/my-events', (req, res) => {
  const studentRegs = store.registrations.filter(r => r.studentId === studentProfile.id || r.userId === studentProfile.id);
  const myEvents = studentRegs.map(reg => {
    const event = store.events.find(e => (e._id === reg.eventId || e.id === reg.eventId));
    return {
      ...reg,
      event: event || null
    };
  });
  res.json(myEvents);
});

app.post('/api/registrations', (req, res) => {
  const { eventId } = req.body;
  if (!eventId) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  const event = store.events.find(e => (e._id === eventId || e.id === eventId));
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  // Duplicate registration check
  const existing = store.registrations.find(r =>
    (r.studentId === studentProfile.id || r.userId === studentProfile.id) &&
    (r.eventId === eventId) &&
    r.status !== 'Cancelled'
  );
  if (existing) {
    return res.status(409).json({ error: 'You are already registered for this event' });
  }

  event.registeredCount = (event.registeredCount || 0) + 1;

  const newReg = {
    id: `REG-${Date.now()}`,
    _id: `REG-${Date.now()}`,
    studentId: studentProfile.id,
    userId: studentProfile.id,
    eventId: eventId,
    name: studentProfile.name,
    email: studentProfile.email,
    registrationDate: new Date().toISOString().split('T')[0],
    status: 'Confirmed',
    attended: false
  };
  store.registrations.push(newReg);

  studentNotifications.unshift({
    id: `NOTIF-${Date.now()}`,
    title: 'Registration Confirmed!',
    message: `You have registered for '${event.title}'.`,
    date: new Date().toISOString().split('T')[0],
    read: false,
    type: 'registration'
  });

  res.status(201).json({
    success: true,
    message: 'Successfully registered for event',
    registration: { ...newReg, event }
  });
});

app.delete('/api/registrations/:eventId', (req, res) => {
  const { eventId } = req.params;
  const regIndex = store.registrations.findIndex(r =>
    (r.studentId === studentProfile.id || r.userId === studentProfile.id) &&
    (r.eventId === eventId) &&
    r.status === 'Confirmed'
  );

  if (regIndex === -1) {
    return res.status(404).json({ error: 'Active registration not found' });
  }

  store.registrations[regIndex].status = 'Cancelled';
  const event = store.events.find(e => (e._id === eventId || e.id === eventId));
  if (event && event.registeredCount > 0) {
    event.registeredCount -= 1;
  }

  studentNotifications.unshift({
    id: `NOTIF-${Date.now()}`,
    title: 'Registration Cancelled',
    message: `Registration for '${event ? event.title : 'Event'}' has been cancelled.`,
    date: new Date().toISOString().split('T')[0],
    read: false,
    type: 'cancellation'
  });

  res.json({ success: true, message: 'Registration cancelled successfully' });
});

// Notifications Endpoints
app.get('/api/notifications', (req, res) => {
  res.json(studentNotifications);
});

app.put('/api/notifications/mark-read', (req, res) => {
  studentNotifications = studentNotifications.map(n => ({ ...n, read: true }));
  res.json({ success: true, message: 'All notifications marked as read' });
});

// Student Stats Endpoint
app.get('/api/student/stats', (req, res) => {
  const studentRegs = store.registrations.filter(r => (r.studentId === studentProfile.id || r.userId === studentProfile.id) && r.status !== 'Cancelled');
  const now = new Date().toISOString().split('T')[0];

  const upcomingCount = studentRegs.filter(r => {
    const evt = store.events.find(e => (e._id === r.eventId || e.id === r.eventId));
    return evt && (evt.date || '2026-09-15') >= now;
  }).length;

  const pastCount = studentRegs.filter(r => {
    const evt = store.events.find(e => (e._id === r.eventId || e.id === r.eventId));
    return (evt && (evt.date || '2026-09-15') < now) || r.status === 'Attended';
  }).length;

  res.json({
    registeredEvents: studentRegs.length,
    upcomingEvents: upcomingCount,
    completedEvents: pastCount,
    availableCampusEvents: store.events.length
  });
});

// Root / Welcome Endpoint
app.get('/', (req, res) => {
  // If request accepts HTML, render portal selection landing or redirect to /admin/dashboard
  if (req.accepts('html')) {
    return res.redirect('/admin/dashboard');
  }
  res.json({
    name: 'EventHive Unified API Server',
    version: '1.0.0',
    description: 'AI-Powered College Event Management Platform',
    modules: {
      admin: '/admin/dashboard',
      organizer: '/api/organizer',
      student: '/api/events',
      health: '/api/health'
    }
  });
});

// Global 404 Handler for APIs
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `API endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`========================================`);
    console.log(`🚀 EventHive Unified Server running on port ${PORT}`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`📊 Admin Panel: http://localhost:${PORT}/admin/dashboard`);
    console.log(`🎯 Organizer API: http://localhost:${PORT}/api/organizer`);
    console.log(`🎓 Student API: http://localhost:${PORT}/api/events`);
    console.log(`🩺 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`========================================`);
  });
}

module.exports = app;
