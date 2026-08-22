/**
 * Mock Data Module for EventHive Admin Dashboard
 *
 * This module provides structured in-memory state and helper methods for:
 * - Admin Authentication
 * - Dashboard Statistics
 * - User Management
 * - Organizer Management
 * - Event Management & Approvals
 * - Service Provider Management
 * - Event Applications
 * - Admin Notifications
 * - Analytics & Reports
 *
 * All operations return Promises to match the async pattern of real DB models.
 */

// --- In-Memory State ---

let users = [
  {
    id: 1,
    name: 'Aashish Kumawat',
    email: 'aashish.student@eventhive.edu',
    rollNumber: '23BCS10142',
    department: 'Computer Science & Engineering',
    role: 'Student',
    status: 'Active',
    joinedDate: '2026-01-15',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    registeredEventsCount: 3
  },
  {
    id: 2,
    name: 'Priya Sharma',
    email: 'priya.sharma@eventhive.edu',
    rollNumber: '23ECE10088',
    department: 'Electronics & Communication',
    role: 'Organizer',
    status: 'Active',
    joinedDate: '2026-02-10',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
    registeredEventsCount: 5
  },
  {
    id: 3,
    name: 'Rohan Mehta',
    email: 'rohan.mehta@eventhive.edu',
    rollNumber: '24ME10204',
    department: 'Mechanical Engineering',
    role: 'Student',
    status: 'Active',
    joinedDate: '2026-02-18',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    registeredEventsCount: 1
  },
  {
    id: 4,
    name: 'Ananya Verma',
    email: 'ananya.verma@eventhive.edu',
    rollNumber: '23MBA10012',
    department: 'Management Studies',
    role: 'Student',
    status: 'Inactive',
    joinedDate: '2026-03-01',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&auto=format&fit=crop&q=80',
    registeredEventsCount: 0
  },
  {
    id: 5,
    name: 'Sameer Khan',
    email: 'sameer.khan@eventhive.edu',
    rollNumber: '22BCS10005',
    department: 'Computer Science & Engineering',
    role: 'Organizer',
    status: 'Active',
    joinedDate: '2025-11-20',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    registeredEventsCount: 8
  },
  {
    id: 6,
    name: 'Kavita Joshi',
    email: 'kavita.joshi@eventhive.edu',
    rollNumber: '24BT10045',
    department: 'Biotechnology',
    role: 'Student',
    status: 'Suspended',
    joinedDate: '2026-04-12',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    registeredEventsCount: 0
  }
];

let organizers = [
  {
    id: 1,
    name: 'ACM Student Chapter',
    leadName: 'Sameer Khan',
    email: 'acm@eventhive.edu',
    department: 'Computer Science & Engineering',
    eventsHosted: 12,
    status: 'Approved',
    verificationDate: '2026-01-10',
    description: 'Premier technical club hosting hackathons, coding contests, and tech symposiums.'
  },
  {
    id: 2,
    name: 'Cultural Committee',
    leadName: 'Priya Sharma',
    email: 'cultural@eventhive.edu',
    department: 'Student Affairs',
    eventsHosted: 8,
    status: 'Approved',
    verificationDate: '2026-01-15',
    description: 'Official student body organizing campus fests, dance, drama, and music events.'
  },
  {
    id: 3,
    name: 'AI & Robotics Club',
    leadName: 'Vikram Sengupta',
    email: 'robotics@eventhive.edu',
    department: 'Electronics & Communication',
    eventsHosted: 5,
    status: 'Approved',
    verificationDate: '2026-02-01',
    description: 'Hardware, drone building, and deep learning workshop organizers.'
  },
  {
    id: 4,
    name: 'Debate & Literary Society',
    leadName: 'Neha Malhotra',
    email: 'debsoc@eventhive.edu',
    department: 'Humanities & Social Sciences',
    eventsHosted: 2,
    status: 'Pending',
    verificationDate: null,
    description: 'Campus forum for parliamentary debates, creative writing, and poetry slams.'
  },
  {
    id: 5,
    name: 'E-Cell (Entrepreneurship Cell)',
    leadName: 'Arjun Nambiar',
    email: 'ecell@eventhive.edu',
    department: 'Management Studies',
    eventsHosted: 4,
    status: 'Pending',
    verificationDate: null,
    description: 'Promoting student startups, angel pitch sessions, and business conclaves.'
  },
  {
    id: 6,
    name: 'Gaming & eSports Syndicate',
    leadName: 'Devansh Roy',
    email: 'esports@eventhive.edu',
    department: 'Computer Science & Engineering',
    eventsHosted: 1,
    status: 'Rejected',
    verificationDate: '2026-08-01',
    description: 'Gaming tournaments organization club.'
  }
];

let events = [
  {
    id: 1,
    title: 'HackHive 2026: Annual Campus Hackathon',
    category: 'Technical',
    department: 'Computer Science & Engineering',
    organizer: 'ACM Student Chapter',
    date: '2026-09-15',
    time: '09:00 AM - 09:00 AM (Next Day)',
    venue: 'Main Auditorium & Innovation Lab',
    totalSeats: 150,
    availableSeats: 42,
    status: 'approved',
    attendees: 108,
    description: '24-hour sprint to build innovative solutions for campus and societal problems.'
  },
  {
    id: 2,
    title: 'AI & Deep Learning Hands-on Workshop',
    category: 'Workshop',
    department: 'Computer Science & Engineering',
    organizer: 'AI & Robotics Club',
    date: '2026-09-02',
    time: '02:00 PM - 05:30 PM',
    venue: 'CS Seminar Hall 2',
    totalSeats: 80,
    availableSeats: 18,
    status: 'approved',
    attendees: 62,
    description: 'Comprehensive workshop covering Transformers, PyTorch, and neural networks.'
  },
  {
    id: 3,
    title: 'Rhythm & Beats: Inter-College Cultural Fest',
    category: 'Cultural',
    department: 'Student Affairs',
    organizer: 'Cultural Committee',
    date: '2026-09-20',
    time: '04:00 PM - 10:00 PM',
    venue: 'Open Air Amphitheatre',
    totalSeats: 500,
    availableSeats: 120,
    status: 'approved',
    attendees: 380,
    description: 'Annual cultural extravaganza featuring battle of the bands and dance.'
  },
  {
    id: 4,
    title: 'Startup Pitch Night & Investor Meet',
    category: 'Seminar',
    department: 'Management Studies',
    organizer: 'E-Cell',
    date: '2026-10-05',
    time: '05:00 PM - 08:30 PM',
    venue: 'Management Conclave Hall',
    totalSeats: 120,
    availableSeats: 120,
    status: 'pending',
    attendees: 0,
    description: 'Platform for student startups to pitch to angel investors and mentors.'
  },
  {
    id: 5,
    title: 'RoboWars & Combat Arena Tournament',
    category: 'Technical',
    department: 'Electronics & Communication',
    organizer: 'AI & Robotics Club',
    date: '2026-09-28',
    time: '10:00 AM - 04:00 PM',
    venue: 'Indoor Sports Complex',
    totalSeats: 100,
    availableSeats: 100,
    status: 'pending',
    attendees: 0,
    description: 'Build and battle combat robots in custom arenas with obstacle racing.'
  },
  {
    id: 6,
    title: 'Unofficial Campus Night Rave',
    category: 'Cultural',
    department: 'All Departments',
    organizer: 'Gaming & eSports Syndicate',
    date: '2026-08-30',
    time: '11:00 PM - 04:00 AM',
    venue: 'Off-Campus Ground',
    totalSeats: 200,
    availableSeats: 200,
    status: 'rejected',
    attendees: 0,
    description: 'Night party without campus safety permits.'
  }
];

let serviceProviders = [
  {
    id: 1,
    name: 'Campus Bites & Caterers',
    category: 'Catering',
    contactPerson: 'Ramesh Gupta',
    email: 'contact@campusbites.com',
    phone: '+91 98765 43210',
    rating: 4.8,
    status: 'Approved',
    eventsServed: 18,
    services: 'Buffet, High Tea, Snacks, Packed Meals'
  },
  {
    id: 2,
    name: 'Grand Royal Hotel & Suites',
    category: 'Hotel & Hospitality',
    contactPerson: 'Meera Deshmukh',
    email: 'reservations@grandroyal.com',
    phone: '+91 98234 56789',
    rating: 4.9,
    status: 'Approved',
    eventsServed: 6,
    services: 'VIP Guest Accommodation, Boardrooms'
  },
  {
    id: 3,
    name: 'Apex Sound & Light Productions',
    category: 'Sound & Lighting',
    contactPerson: 'Sanjay Rawat',
    email: 'info@apexsound.in',
    phone: '+91 91234 56780',
    rating: 4.7,
    status: 'Approved',
    eventsServed: 24,
    services: 'Stage Lighting, Line Array Audio, Trussing'
  },
  {
    id: 4,
    name: 'Shree Balaji Tent & Decorators',
    category: 'Tent & Staging',
    contactPerson: 'Rajesh Sharma',
    email: 'balajitents@gmail.com',
    phone: '+91 94567 89012',
    rating: 4.5,
    status: 'Pending',
    eventsServed: 0,
    services: 'Waterproof Pandals, Canopies, Seating'
  },
  {
    id: 5,
    name: 'Vivid Memories Photography',
    category: 'Photography & Media',
    contactPerson: 'Tanmay Jain',
    email: 'tanmay@vividmemories.com',
    phone: '+91 99887 76655',
    rating: 4.6,
    status: 'Pending',
    eventsServed: 0,
    services: '4K Event Videography, Drone Shots, Live Stream'
  },
  {
    id: 6,
    name: 'Unverified Event Security Staff',
    category: 'Security & Bouncers',
    contactPerson: 'Karan B.',
    email: 'karan@security.net',
    phone: '+91 90000 11122',
    rating: 3.2,
    status: 'Rejected',
    eventsServed: 0,
    services: 'Crowd control without government license'
  }
];

let applications = [
  {
    id: 101,
    eventId: 1,
    eventTitle: 'HackHive 2026: Annual Campus Hackathon',
    providerId: 1,
    providerName: 'Campus Bites & Caterers',
    category: 'Catering',
    proposal: 'Provide 24-hr midnight snacks, energy drinks, breakfast and lunch for 150 hackathon participants.',
    estimatedCost: '₹45,000',
    status: 'Accepted',
    appliedDate: '2026-08-15'
  },
  {
    id: 102,
    eventId: 3,
    eventTitle: 'Rhythm & Beats: Inter-College Cultural Fest',
    providerId: 3,
    providerName: 'Apex Sound & Light Productions',
    category: 'Sound & Lighting',
    proposal: 'Full stage concert audio setup, laser show, and 30,000-watt sound reinforcement.',
    estimatedCost: '₹85,000',
    status: 'Accepted',
    appliedDate: '2026-08-18'
  },
  {
    id: 103,
    eventId: 4,
    eventTitle: 'Startup Pitch Night & Investor Meet',
    providerId: 2,
    providerName: 'Grand Royal Hotel & Suites',
    category: 'Hotel & Hospitality',
    proposal: 'Accommodation for 8 venture capital judges and banquet high-tea setup.',
    estimatedCost: '₹32,000',
    status: 'Pending',
    appliedDate: '2026-08-20'
  },
  {
    id: 104,
    eventId: 5,
    eventTitle: 'RoboWars & Combat Arena Tournament',
    providerId: 4,
    providerName: 'Shree Balaji Tent & Decorators',
    category: 'Tent & Staging',
    proposal: 'High-durability arena barricading and spectator bleachers.',
    estimatedCost: '₹28,000',
    status: 'Pending',
    appliedDate: '2026-08-21'
  },
  {
    id: 105,
    eventId: 2,
    eventTitle: 'AI & Deep Learning Hands-on Workshop',
    providerId: 5,
    providerName: 'Vivid Memories Photography',
    category: 'Photography & Media',
    proposal: 'Full event recording and certificate photo shoot.',
    estimatedCost: '₹12,000',
    status: 'Rejected',
    appliedDate: '2026-08-19'
  }
];

let notifications = [
  {
    id: 1,
    type: 'event_request',
    title: 'New Event Approval Request',
    message: 'E-Cell submitted "Startup Pitch Night & Investor Meet" for administrative review.',
    timestamp: '2026-08-22 14:30',
    read: false,
    link: '/admin/events'
  },
  {
    id: 2,
    type: 'organizer_request',
    title: 'New Organizer Registration',
    message: 'Neha Malhotra requested organizer verification for Debate & Literary Society.',
    timestamp: '2026-08-21 11:15',
    read: false,
    link: '/admin/organizers'
  },
  {
    id: 3,
    type: 'provider_application',
    title: 'Service Provider Application',
    message: 'Grand Royal Hotel applied for Startup Pitch Night hospitality services.',
    timestamp: '2026-08-20 16:45',
    read: false,
    link: '/admin/applications'
  },
  {
    id: 4,
    type: 'system',
    title: 'System Health & Backup Completed',
    message: 'Nightly database snapshot and audit log backup completed successfully.',
    timestamp: '2026-08-20 02:00',
    read: true,
    link: '/admin/dashboard'
  }
];

// --- Exported Async Helper Functions ---

// 1. Dashboard Stats
async function getDashboardStats() {
  const pendingEvts = events.filter(e => e.status === 'pending').length;
  const pendingOrgs = organizers.filter(o => o.status === 'Pending').length;
  const pendingProvs = serviceProviders.filter(p => p.status === 'Pending').length;
  const pendingApps = applications.filter(a => a.status === 'Pending').length;

  return {
    totalUsers: users.length * 250, // Scaled for realistic campus representation
    totalOrganizers: organizers.length,
    totalEvents: events.length,
    pendingApprovals: pendingEvts + pendingOrgs + pendingProvs,
    serviceProviders: serviceProviders.length,
    pendingApplications: pendingApps,
    activeEvents: events.filter(e => e.status === 'approved').length
  };
}

// 2. Recent Events
async function getRecentEvents() {
  return events.slice(0, 5);
}

// 3. Pending Approvals list for dashboard
async function getPendingApprovals() {
  const list = [];

  events.filter(e => e.status === 'pending').forEach(e => {
    list.push({
      id: e.id,
      type: 'event',
      title: e.title,
      requestedBy: e.organizer,
      requestedDate: e.date,
      description: e.description
    });
  });

  organizers.filter(o => o.status === 'Pending').forEach(o => {
    list.push({
      id: o.id,
      type: 'organizer',
      title: `${o.name} (Lead: ${o.leadName})`,
      requestedBy: o.email,
      requestedDate: '2026-08-20',
      description: o.description
    });
  });

  serviceProviders.filter(p => p.status === 'Pending').forEach(p => {
    list.push({
      id: p.id,
      type: 'service_provider',
      title: `${p.name} (${p.category})`,
      requestedBy: p.contactPerson,
      requestedDate: '2026-08-21',
      description: p.services
    });
  });

  return list;
}

// 4. Users CRUD
async function getAllUsers(query = {}) {
  let result = [...users];
  if (query.search) {
    const q = query.search.toLowerCase();
    result = result.filter(u =>
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.rollNumber && u.rollNumber.toLowerCase().includes(q)) ||
      u.department.toLowerCase().includes(q)
    );
  }
  if (query.role && query.role !== 'All') {
    result = result.filter(u => u.role.toLowerCase() === query.role.toLowerCase());
  }
  if (query.status && query.status !== 'All') {
    result = result.filter(u => u.status.toLowerCase() === query.status.toLowerCase());
  }
  return result;
}

async function getUserById(id) {
  return users.find(u => u.id === parseInt(id)) || null;
}

async function toggleUserStatus(id) {
  const user = users.find(u => u.id === parseInt(id));
  if (user) {
    user.status = user.status === 'Active' ? 'Inactive' : 'Active';
    return user;
  }
  return null;
}

async function deleteUser(id) {
  const idx = users.findIndex(u => u.id === parseInt(id));
  if (idx !== -1) {
    const deleted = users.splice(idx, 1)[0];
    return deleted;
  }
  return null;
}

// 5. Organizers CRUD
async function getAllOrganizers(query = {}) {
  let result = [...organizers];
  if (query.search) {
    const q = query.search.toLowerCase();
    result = result.filter(o =>
      o.name.toLowerCase().includes(q) ||
      o.leadName.toLowerCase().includes(q) ||
      o.email.toLowerCase().includes(q) ||
      o.department.toLowerCase().includes(q)
    );
  }
  if (query.status && query.status !== 'All') {
    result = result.filter(o => o.status.toLowerCase() === query.status.toLowerCase());
  }
  return result;
}

async function updateOrganizerStatus(id, status) {
  const org = organizers.find(o => o.id === parseInt(id));
  if (org) {
    org.status = status;
    if (status === 'Approved') {
      org.verificationDate = new Date().toISOString().split('T')[0];
    }
    return org;
  }
  return null;
}

// 6. Events CRUD
async function getAllEvents(query = {}) {
  let result = [...events];
  if (query.search) {
    const q = query.search.toLowerCase();
    result = result.filter(e =>
      e.title.toLowerCase().includes(q) ||
      e.organizer.toLowerCase().includes(q) ||
      e.venue.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q)
    );
  }
  if (query.status && query.status !== 'All') {
    result = result.filter(e => e.status.toLowerCase() === query.status.toLowerCase());
  }
  if (query.category && query.category !== 'All') {
    result = result.filter(e => e.category.toLowerCase() === query.category.toLowerCase());
  }
  return result;
}

async function updateEventStatus(id, status) {
  const evt = events.find(e => e.id === parseInt(id));
  if (evt) {
    evt.status = status;
    return evt;
  }
  return null;
}

async function deleteEvent(id) {
  const idx = events.findIndex(e => e.id === parseInt(id));
  if (idx !== -1) {
    return events.splice(idx, 1)[0];
  }
  return null;
}

// 7. Service Providers CRUD
async function getAllProviders(query = {}) {
  let result = [...serviceProviders];
  if (query.search) {
    const q = query.search.toLowerCase();
    result = result.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.contactPerson.toLowerCase().includes(q) ||
      p.email.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }
  if (query.category && query.category !== 'All') {
    result = result.filter(p => p.category.toLowerCase() === query.category.toLowerCase());
  }
  if (query.status && query.status !== 'All') {
    result = result.filter(p => p.status.toLowerCase() === query.status.toLowerCase());
  }
  return result;
}

async function updateProviderStatus(id, status) {
  const prov = serviceProviders.find(p => p.id === parseInt(id));
  if (prov) {
    prov.status = status;
    return prov;
  }
  return null;
}

// 8. Applications CRUD
async function getAllApplications(query = {}) {
  let result = [...applications];
  if (query.search) {
    const q = query.search.toLowerCase();
    result = result.filter(a =>
      a.eventTitle.toLowerCase().includes(q) ||
      a.providerName.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.proposal.toLowerCase().includes(q)
    );
  }
  if (query.status && query.status !== 'All') {
    result = result.filter(a => a.status.toLowerCase() === query.status.toLowerCase());
  }
  if (query.eventId && query.eventId !== 'All') {
    result = result.filter(a => a.eventId === parseInt(query.eventId));
  }
  return result;
}

async function updateApplicationStatus(id, status) {
  const app = applications.find(a => a.id === parseInt(id));
  if (app) {
    app.status = status;
    return app;
  }
  return null;
}

// 9. Notifications CRUD
async function getNotifications() {
  return [...notifications];
}

async function markAllNotificationsRead() {
  notifications = notifications.map(n => ({ ...n, read: true }));
  return true;
}

async function markNotificationRead(id) {
  const notif = notifications.find(n => n.id === parseInt(id));
  if (notif) {
    notif.read = true;
    return notif;
  }
  return null;
}

// 10. Reports & Analytics
async function getAdminReports() {
  const totalUsersCount = users.length * 250;
  const activeEventsCount = events.filter(e => e.status === 'approved').length;
  const pendingEventsCount = events.filter(e => e.status === 'pending').length;
  const rejectedEventsCount = events.filter(e => e.status === 'rejected').length;

  const categoryBreakdown = [
    { category: 'Technical', count: 18, percentage: 40 },
    { category: 'Cultural', count: 12, percentage: 27 },
    { category: 'Workshops', count: 8, percentage: 18 },
    { category: 'Seminars', count: 4, percentage: 9 },
    { category: 'Sports', count: 3, percentage: 6 }
  ];

  const monthlyTrend = [
    { month: 'May 2026', events: 14, attendance: 2100, applications: 8 },
    { month: 'Jun 2026', events: 19, attendance: 3400, applications: 12 },
    { month: 'Jul 2026', events: 24, attendance: 4800, applications: 18 },
    { month: 'Aug 2026', events: 32, attendance: 6500, applications: 25 }
  ];

  const departmentParticipation = [
    { dept: 'Computer Science & Engineering', events: 15, students: 680 },
    { dept: 'Electronics & Communication', events: 10, students: 420 },
    { dept: 'Mechanical Engineering', events: 6, students: 260 },
    { dept: 'Management Studies', events: 8, students: 310 },
    { dept: 'Biotechnology', events: 4, students: 180 }
  ];

  return {
    overview: {
      totalUsers: totalUsersCount,
      totalOrganizers: organizers.length,
      totalProviders: serviceProviders.length,
      totalEvents: events.length,
      approvedEvents: activeEventsCount,
      pendingEvents: pendingEventsCount,
      rejectedEvents: rejectedEventsCount,
      totalApplications: applications.length,
      acceptedApplications: applications.filter(a => a.status === 'Accepted').length
    },
    categoryBreakdown,
    monthlyTrend,
    departmentParticipation
  };
}

module.exports = {
  getDashboardStats,
  getRecentEvents,
  getPendingApprovals,
  getAllUsers,
  getUserById,
  toggleUserStatus,
  deleteUser,
  getAllOrganizers,
  updateOrganizerStatus,
  getAllEvents,
  updateEventStatus,
  deleteEvent,
  getAllProviders,
  updateProviderStatus,
  getAllApplications,
  updateApplicationStatus,
  getNotifications,
  markAllNotificationsRead,
  markNotificationRead,
  getAdminReports
};
