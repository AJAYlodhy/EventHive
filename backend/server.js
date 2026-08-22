const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-Memory Database for Campus Events & Registrations
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

let events = [
  {
    id: "EVT-101",
    title: "HackHive 2026: Annual Campus Hackathon",
    category: "Technical",
    department: "Computer Science & Engineering",
    description: "24-hour sprint to build innovative solutions for campus and societal problems. Mentors from top tech firms will be present.",
    date: "2026-09-15",
    time: "09:00 AM - 09:00 AM (Next Day)",
    venue: "Main Auditorium & Innovation Lab",
    organizer: "ACM Student Chapter",
    totalSeats: 150,
    availableSeats: 42,
    eventType: "In-Person",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "EVT-102",
    title: "AI & Deep Learning Hands-on Workshop",
    category: "Workshop",
    department: "Computer Science & Engineering",
    description: "Comprehensive workshop covering Transformers, PyTorch, and deploying neural networks for real-world computer vision tasks.",
    date: "2026-09-02",
    time: "02:00 PM - 05:30 PM",
    venue: "CS Seminar Hall 2",
    organizer: "AI & Robotics Club",
    totalSeats: 80,
    availableSeats: 18,
    eventType: "In-Person",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "EVT-103",
    title: "Rhythm & Beats: Inter-College Cultural Fest",
    category: "Cultural",
    department: "All",
    description: "Annual cultural extravaganza featuring battle of the bands, group dances, fashion show, and guest DJ performance.",
    date: "2026-09-20",
    time: "04:00 PM - 10:00 PM",
    venue: "Open Air Amphitheatre",
    organizer: "Cultural Committee",
    totalSeats: 500,
    availableSeats: 120,
    eventType: "In-Person",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "EVT-104",
    title: "RoboWars & Drone Racing Challenge",
    category: "Technical",
    department: "Electronics & Communication",
    description: "Build and battle combat robots in custom arenas, plus obstacle-course drone racing for robotics enthusiasts.",
    date: "2026-09-28",
    time: "10:00 AM - 04:00 PM",
    venue: "Indoor Sports Complex",
    organizer: "Robotics Club",
    totalSeats: 100,
    availableSeats: 35,
    eventType: "In-Person",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "EVT-105",
    title: "Tech Career & Internship Readiness Seminar",
    category: "Seminar",
    department: "Computer Science & Engineering",
    description: "Industry panel discussion on cracking software engineering internships, resume building, and mock interviews with alumni.",
    date: "2026-08-28",
    time: "03:00 PM - 05:00 PM",
    venue: "Virtual via Google Meet",
    organizer: "Training & Placement Cell",
    totalSeats: 250,
    availableSeats: 95,
    eventType: "Online",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "EVT-106",
    title: "Inter-Department Cricket Tournament",
    category: "Sports",
    department: "All",
    description: "Annual knockout T20 cricket tournament between departments. Cheer on your departmental teams!",
    date: "2026-09-10",
    time: "08:00 AM - 06:00 PM",
    venue: "University Sports Ground",
    organizer: "Sports Council",
    totalSeats: 200,
    availableSeats: 60,
    eventType: "In-Person",
    status: "Upcoming",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "EVT-098",
    title: "Web3 & Blockchain Developer Bootcamp",
    category: "Workshop",
    department: "Computer Science & Engineering",
    description: "Hands-on introduction to Smart Contracts, Solidity, and decentralized app development.",
    date: "2026-07-20",
    time: "10:00 AM - 04:00 PM",
    venue: "Lab 304, CS Block",
    organizer: "Crypto & Blockchain Society",
    totalSeats: 60,
    availableSeats: 0,
    eventType: "In-Person",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&auto=format&fit=crop&q=80"
  },
  {
    id: "EVT-099",
    title: "National Youth Leadership Summit 2026",
    category: "Seminar",
    department: "Management",
    description: "Keynote talks by distinguished entrepreneurs, policymakers, and industry pioneers on leadership.",
    date: "2026-08-05",
    time: "11:00 AM - 03:00 PM",
    venue: "Central Auditorium",
    organizer: "Student Affairs",
    totalSeats: 300,
    availableSeats: 0,
    eventType: "In-Person",
    status: "Completed",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80"
  }
];

let registrations = [
  {
    id: "REG-901",
    studentId: "STU-2026-042",
    eventId: "EVT-101",
    registrationDate: "2026-08-20",
    status: "Confirmed"
  },
  {
    id: "REG-902",
    studentId: "STU-2026-042",
    eventId: "EVT-098",
    registrationDate: "2026-07-15",
    status: "Attended"
  }
];

let notifications = [
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

// --- ROUTES ---

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'EventHive Backend API', version: '1.0.0' });
});

// 2. Student Profile
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

// 3. Events List & Details
app.get('/api/events', (req, res) => {
  const { category, department, search, dateFilter } = req.query;
  let filtered = [...events];

  if (category && category !== 'All') {
    filtered = filtered.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }

  if (department && department !== 'All') {
    filtered = filtered.filter(e => e.department === department || e.department === 'All');
  }

  if (search) {
    const q = search.toLowerCase();
    filtered = filtered.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q) ||
      e.organizer.toLowerCase().includes(q)
    );
  }

  res.json(filtered);
});

app.get('/api/events/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
});

// 4. Registrations
app.get('/api/registrations/my-events', (req, res) => {
  const studentRegs = registrations.filter(r => r.studentId === studentProfile.id);
  const myEvents = studentRegs.map(reg => {
    const event = events.find(e => e.id === reg.eventId);
    return {
      ...reg,
      event: event || null
    };
  });
  res.json(myEvents);
});

// Register for an event
app.post('/api/registrations', (req, res) => {
  const { eventId } = req.body;
  if (!eventId) {
    return res.status(400).json({ error: 'Event ID is required' });
  }

  const event = events.find(e => e.id === eventId);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  // Check duplicate registration
  const existing = registrations.find(r => r.studentId === studentProfile.id && r.eventId === eventId && r.status !== 'Cancelled');
  if (existing) {
    return res.status(409).json({ error: 'You are already registered for this event' });
  }

  // Check seat capacity
  if (event.availableSeats <= 0) {
    return res.status(400).json({ error: 'No seats available for this event' });
  }

  // Decrement seat
  event.availableSeats -= 1;

  const newReg = {
    id: `REG-${Date.now()}`,
    studentId: studentProfile.id,
    eventId: eventId,
    registrationDate: new Date().toISOString().split('T')[0],
    status: 'Confirmed'
  };
  registrations.push(newReg);

  // Add notification
  notifications.unshift({
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

// Cancel registration
app.delete('/api/registrations/:eventId', (req, res) => {
  const { eventId } = req.params;
  const regIndex = registrations.findIndex(r => r.studentId === studentProfile.id && r.eventId === eventId && r.status === 'Confirmed');

  if (regIndex === -1) {
    return res.status(404).json({ error: 'Active registration not found' });
  }

  registrations[regIndex].status = 'Cancelled';

  // Increment available seats
  const event = events.find(e => e.id === eventId);
  if (event) {
    event.availableSeats += 1;
  }

  notifications.unshift({
    id: `NOTIF-${Date.now()}`,
    title: 'Registration Cancelled',
    message: `Registration for '${event ? event.title : 'Event'}' has been cancelled.`,
    date: new Date().toISOString().split('T')[0],
    read: false,
    type: 'cancellation'
  });

  res.json({ success: true, message: 'Registration cancelled successfully' });
});

// 5. Notifications
app.get('/api/notifications', (req, res) => {
  res.json(notifications);
});

app.put('/api/notifications/mark-read', (req, res) => {
  notifications = notifications.map(n => ({ ...n, read: true }));
  res.json({ success: true, message: 'All notifications marked as read' });
});

// 6. Statistics
app.get('/api/student/stats', (req, res) => {
  const studentRegs = registrations.filter(r => r.studentId === studentProfile.id && r.status !== 'Cancelled');
  const now = new Date().toISOString().split('T')[0];

  const upcomingCount = studentRegs.filter(r => {
    const evt = events.find(e => e.id === r.eventId);
    return evt && evt.date >= now;
  }).length;

  const pastCount = studentRegs.filter(r => {
    const evt = events.find(e => e.id === r.eventId);
    return (evt && evt.date < now) || r.status === 'Attended';
  }).length;

  const availableCount = events.filter(e => e.date >= now && e.status !== 'Completed').length;

  res.json({
    registeredEvents: studentRegs.length,
    upcomingEvents: upcomingCount,
    completedEvents: pastCount,
    availableCampusEvents: availableCount
  });
});

app.listen(PORT, () => {
  console.log(`EventHive Backend API running on http://localhost:${PORT}`);
});
