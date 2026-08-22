const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

// Initial seed password hash for demo accounts: "organizer123"
const DEMO_PASSWORD_HASH = bcrypt.hashSync('organizer123', 10);

class DataStore {
  constructor() {
    this.users = [];
    this.events = [];
    this.registrations = [];
    this.initSeedData();
  }

  initSeedData() {
    // 1. Seed Organizers
    const organizer1 = {
      _id: 'org_001',
      name: 'Alex Rivera',
      email: 'alex.organizer@eventhive.com',
      password: DEMO_PASSWORD_HASH,
      role: 'organizer',
      organization: 'Tech & Innovation Council',
      phone: '+1 (555) 234-5678',
      bio: 'Lead coordinator for technology hackathons, coding workshops, and campus engineering symposiums.',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop&crop=face',
      website: 'https://techcouncil.eventhive.io',
      createdAt: new Date('2026-01-10T09:00:00Z').toISOString(),
    };

    const organizer2 = {
      _id: 'org_002',
      name: 'Sarah Chen',
      email: 'sarah.organizer@eventhive.com',
      password: DEMO_PASSWORD_HASH,
      role: 'organizer',
      organization: 'Campus Arts & Culture Society',
      phone: '+1 (555) 876-5432',
      bio: 'Curating dynamic cultural nights, musical fests, and expressive arts exhibitions.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop&crop=face',
      website: 'https://artsoc.eventhive.io',
      createdAt: new Date('2026-01-15T10:00:00Z').toISOString(),
    };

    this.users = [organizer1, organizer2];

    // 2. Seed Events for Alex (org_001)
    const event1 = {
      _id: 'evt_101',
      organizerId: 'org_001',
      organizerName: 'Alex Rivera',
      title: 'DevSphere 2026: AI & Cloud Hackathon',
      description: 'Join 300+ developers, designers, and innovators for a 36-hour sprint building next-gen AI applications, cloud solutions, and distributed systems. Mentors from top tech giants, cash prizes, and sponsor booths available.',
      category: 'Tech & Coding',
      date: '2026-09-15',
      startTime: '09:00',
      endTime: '18:00',
      venue: 'Main Innovation Center, Hall A & B',
      locationType: 'In-Person',
      maxCapacity: 250,
      registeredCount: 184,
      bannerUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&h=600&fit=crop',
      registrationDeadline: '2026-09-10T23:59',
      contactEmail: 'alex.organizer@eventhive.com',
      contactPhone: '+1 (555) 234-5678',
      status: 'Published',
      tags: ['AI', 'Hackathon', 'Cloud', 'Networking'],
      price: 0,
      createdAt: new Date('2026-02-01T10:00:00Z').toISOString(),
      updatedAt: new Date('2026-02-01T10:00:00Z').toISOString(),
    };

    const event2 = {
      _id: 'evt_102',
      organizerId: 'org_001',
      organizerName: 'Alex Rivera',
      title: 'FullStack Web Architecture Masterclass',
      description: 'An interactive hands-on deep dive into microservices, scalable backend design with Node.js & React, caching strategies, and CI/CD pipelines for production deployments.',
      category: 'Workshops & Training',
      date: '2026-09-22',
      startTime: '14:00',
      endTime: '17:30',
      venue: 'Online via Zoom',
      locationType: 'Online',
      maxCapacity: 150,
      registeredCount: 132,
      bannerUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
      registrationDeadline: '2026-09-20T18:00',
      contactEmail: 'alex.organizer@eventhive.com',
      contactPhone: '+1 (555) 234-5678',
      status: 'Published',
      tags: ['WebDev', 'React', 'NodeJS', 'Architecture'],
      price: 0,
      createdAt: new Date('2026-02-05T14:30:00Z').toISOString(),
      updatedAt: new Date('2026-02-05T14:30:00Z').toISOString(),
    };

    const event3 = {
      _id: 'evt_103',
      organizerId: 'org_001',
      organizerName: 'Alex Rivera',
      title: 'Quantum Computing & Cryptography Symposium',
      description: 'Distinguished lecture series exploring post-quantum cryptography algorithms, quantum computing hardware breakthroughs, and secure communication protocols.',
      category: 'Seminars & Talks',
      date: '2026-10-05',
      startTime: '10:30',
      endTime: '13:00',
      venue: 'Auditorium 2, Science Complex',
      locationType: 'In-Person',
      maxCapacity: 100,
      registeredCount: 45,
      bannerUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&h=600&fit=crop',
      registrationDeadline: '2026-10-01T23:59',
      contactEmail: 'alex.organizer@eventhive.com',
      contactPhone: '+1 (555) 234-5678',
      status: 'Published',
      tags: ['Quantum', 'Security', 'Research'],
      price: 0,
      createdAt: new Date('2026-02-10T11:00:00Z').toISOString(),
      updatedAt: new Date('2026-02-10T11:00:00Z').toISOString(),
    };

    const event4 = {
      _id: 'evt_104',
      organizerId: 'org_001',
      organizerName: 'Alex Rivera',
      title: 'Spring Game Jam & Esports Showcase 2026',
      description: 'Game design marathon followed by collegiate esports tournament. Unity, Unreal, and Godot game showcases with community playtesting.',
      category: 'Gaming & E-Sports',
      date: '2026-05-18',
      startTime: '10:00',
      endTime: '20:00',
      venue: 'Recreation Center Gaming Arena',
      locationType: 'In-Person',
      maxCapacity: 120,
      registeredCount: 120,
      bannerUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&h=600&fit=crop',
      registrationDeadline: '2026-05-15T12:00',
      contactEmail: 'alex.organizer@eventhive.com',
      contactPhone: '+1 (555) 234-5678',
      status: 'Completed',
      tags: ['Gaming', 'Unity', 'Tournament'],
      price: 0,
      createdAt: new Date('2026-01-20T08:00:00Z').toISOString(),
      updatedAt: new Date('2026-05-19T09:00:00Z').toISOString(),
    };

    const event5 = {
      _id: 'evt_105',
      organizerId: 'org_001',
      organizerName: 'Alex Rivera',
      title: 'Next-Gen Mobile App Bootcamp',
      description: 'Draft curriculum for upcoming Swift & Flutter cross-platform mobile development training workshop.',
      category: 'Workshops & Training',
      date: '2026-11-12',
      startTime: '13:00',
      endTime: '16:00',
      venue: 'Lab 404, Engineering Wing',
      locationType: 'In-Person',
      maxCapacity: 60,
      registeredCount: 0,
      bannerUrl: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=600&fit=crop',
      registrationDeadline: '2026-11-10T12:00',
      contactEmail: 'alex.organizer@eventhive.com',
      contactPhone: '+1 (555) 234-5678',
      status: 'Draft',
      tags: ['Mobile', 'Flutter', 'iOS'],
      price: 0,
      createdAt: new Date('2026-02-18T16:00:00Z').toISOString(),
      updatedAt: new Date('2026-02-18T16:00:00Z').toISOString(),
    };

    // Event for Sarah (org_002) to verify authorization isolation
    const eventSarah = {
      _id: 'evt_201',
      organizerId: 'org_002',
      organizerName: 'Sarah Chen',
      title: 'Harmony: Annual Spring Music Festival',
      description: 'Campus acoustic sets, classical ensembles, and indie band showcases.',
      category: 'Cultural & Arts',
      date: '2026-09-28',
      startTime: '17:00',
      endTime: '22:00',
      venue: 'Open Air Amphitheatre',
      locationType: 'In-Person',
      maxCapacity: 500,
      registeredCount: 310,
      bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&h=600&fit=crop',
      registrationDeadline: '2026-09-25T23:59',
      contactEmail: 'sarah.organizer@eventhive.com',
      contactPhone: '+1 (555) 876-5432',
      status: 'Published',
      tags: ['Music', 'Concert', 'Culture'],
      price: 0,
      createdAt: new Date('2026-02-02T12:00:00Z').toISOString(),
      updatedAt: new Date('2026-02-02T12:00:00Z').toISOString(),
    };

    this.events = [event1, event2, event3, event4, event5, eventSarah];

    // 3. Seed Registrations for event1 (DevSphere) and event2 (Masterclass)
    this.registrations = [
      {
        _id: 'reg_001',
        eventId: 'evt_101',
        eventTitle: 'DevSphere 2026: AI & Cloud Hackathon',
        participantName: 'Liam Johnson',
        participantEmail: 'liam.j@university.edu',
        participantPhone: '+1 (555) 111-2233',
        studentId: 'STU-2026-091',
        ticketCode: 'EH-DS26-98101',
        status: 'Confirmed',
        registeredAt: '2026-08-10T14:22:00Z',
        notes: 'Interested in AI track & distributed compute',
      },
      {
        _id: 'reg_002',
        eventId: 'evt_101',
        eventTitle: 'DevSphere 2026: AI & Cloud Hackathon',
        participantName: 'Emma Watson',
        participantEmail: 'emma.w@university.edu',
        participantPhone: '+1 (555) 222-3344',
        studentId: 'STU-2026-118',
        ticketCode: 'EH-DS26-98102',
        status: 'Confirmed',
        registeredAt: '2026-08-11T09:15:00Z',
        notes: 'Team Lead for UI/UX Project',
      },
      {
        _id: 'reg_003',
        eventId: 'evt_101',
        eventTitle: 'DevSphere 2026: AI & Cloud Hackathon',
        participantName: 'David Kim',
        participantEmail: 'david.kim@university.edu',
        participantPhone: '+1 (555) 333-4455',
        studentId: 'STU-2026-245',
        ticketCode: 'EH-DS26-98103',
        status: 'Attended',
        registeredAt: '2026-08-12T16:40:00Z',
        notes: 'Checked in early',
      },
      {
        _id: 'reg_004',
        eventId: 'evt_101',
        eventTitle: 'DevSphere 2026: AI & Cloud Hackathon',
        participantName: 'Sophia Patel',
        participantEmail: 'sophia.p@university.edu',
        participantPhone: '+1 (555) 444-5566',
        studentId: 'STU-2026-302',
        ticketCode: 'EH-DS26-98104',
        status: 'Pending',
        registeredAt: '2026-08-15T11:05:00Z',
        notes: 'Awaiting team confirmation',
      },
      {
        _id: 'reg_005',
        eventId: 'evt_101',
        eventTitle: 'DevSphere 2026: AI & Cloud Hackathon',
        participantName: 'Lucas Martin',
        participantEmail: 'lucas.m@university.edu',
        participantPhone: '+1 (555) 555-6677',
        studentId: 'STU-2026-419',
        ticketCode: 'EH-DS26-98105',
        status: 'Cancelled',
        registeredAt: '2026-08-16T18:30:00Z',
        notes: 'Schedule conflict',
      },
      {
        _id: 'reg_006',
        eventId: 'evt_102',
        eventTitle: 'FullStack Web Architecture Masterclass',
        participantName: 'Olivia Davis',
        participantEmail: 'olivia.d@university.edu',
        participantPhone: '+1 (555) 666-7788',
        studentId: 'STU-2026-551',
        ticketCode: 'EH-WA26-77001',
        status: 'Confirmed',
        registeredAt: '2026-08-14T10:11:00Z',
        notes: 'Pre-requisites completed',
      },
      {
        _id: 'reg_007',
        eventId: 'evt_102',
        eventTitle: 'FullStack Web Architecture Masterclass',
        participantName: 'Noah Wilson',
        participantEmail: 'noah.w@university.edu',
        participantPhone: '+1 (555) 777-8899',
        studentId: 'STU-2026-612',
        ticketCode: 'EH-WA26-77002',
        status: 'Attended',
        registeredAt: '2026-08-15T15:20:00Z',
        notes: 'Joined live stream',
      },
    ];
  }

  // --- Users ---
  findUserById(id) {
    return this.users.find(u => u._id === id);
  }

  findUserByEmail(email) {
    return this.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(userData) {
    const newUser = {
      _id: `user_${uuidv4().substring(0, 8)}`,
      role: 'organizer',
      createdAt: new Date().toISOString(),
      ...userData,
    };
    this.users.push(newUser);
    return newUser;
  }

  updateUser(id, updates) {
    const index = this.users.findIndex(u => u._id === id);
    if (index === -1) return null;
    this.users[index] = {
      ...this.users[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.users[index];
  }

  // --- Events ---
  getEventsByOrganizer(organizerId, { search, status, category, page = 1, limit = 10 } = {}) {
    let list = this.events.filter(e => e.organizerId === organizerId);

    if (status && status !== 'All') {
      list = list.filter(e => e.status.toLowerCase() === status.toLowerCase());
    }

    if (category && category !== 'All') {
      list = list.filter(e => e.category.toLowerCase() === category.toLowerCase());
    }

    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        e =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.venue.toLowerCase().includes(q) ||
          (e.tags && e.tags.some(t => t.toLowerCase().includes(q)))
      );
    }

    // Sort by Date descending / created
    list.sort((a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt));

    const total = list.length;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + Number(limit));

    return {
      events: paginated,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)) || 1,
    };
  }

  getEventById(id) {
    return this.events.find(e => e._id === id);
  }

  createEvent(organizer, eventData) {
    const newEvent = {
      _id: `evt_${uuidv4().substring(0, 8)}`,
      organizerId: organizer._id,
      organizerName: organizer.name,
      registeredCount: 0,
      status: eventData.status || 'Published',
      price: Number(eventData.price) || 0,
      maxCapacity: Number(eventData.maxCapacity) || 100,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...eventData,
    };
    this.events.unshift(newEvent);
    return newEvent;
  }

  updateEvent(id, organizerId, updates) {
    const index = this.events.findIndex(e => e._id === id && e.organizerId === organizerId);
    if (index === -1) return null;
    
    this.events[index] = {
      ...this.events[index],
      ...updates,
      maxCapacity: updates.maxCapacity !== undefined ? Number(updates.maxCapacity) : this.events[index].maxCapacity,
      price: updates.price !== undefined ? Number(updates.price) : this.events[index].price,
      updatedAt: new Date().toISOString(),
    };
    return this.events[index];
  }

  deleteEvent(id, organizerId) {
    const index = this.events.findIndex(e => e._id === id && e.organizerId === organizerId);
    if (index === -1) return false;
    this.events.splice(index, 1);
    // Cleanup registrations
    this.registrations = this.registrations.filter(r => r.eventId !== id);
    return true;
  }

  updateEventStatus(id, organizerId, newStatus) {
    const event = this.events.find(e => e._id === id && e.organizerId === organizerId);
    if (!event) return null;
    event.status = newStatus;
    event.updatedAt = new Date().toISOString();
    return event;
  }

  // --- Registrations ---
  getRegistrationsForEvent(eventId, { search, status } = {}) {
    let list = this.registrations.filter(r => r.eventId === eventId);
    if (status && status !== 'All') {
      list = list.filter(r => r.status.toLowerCase() === status.toLowerCase());
    }
    if (search && search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        r =>
          r.participantName.toLowerCase().includes(q) ||
          r.participantEmail.toLowerCase().includes(q) ||
          (r.ticketCode && r.ticketCode.toLowerCase().includes(q)) ||
          (r.studentId && r.studentId.toLowerCase().includes(q))
      );
    }
    return list;
  }

  updateRegistrationStatus(registrationId, status) {
    const reg = this.registrations.find(r => r._id === registrationId);
    if (!reg) return null;
    reg.status = status;
    return reg;
  }

  // --- Dashboard Metrics ---
  getDashboardStats(organizerId) {
    const orgEvents = this.events.filter(e => e.organizerId === organizerId);
    const todayStr = new Date().toISOString().split('T')[0];

    const totalEvents = orgEvents.length;
    const upcomingEvents = orgEvents.filter(
      e => e.status !== 'Completed' && e.status !== 'Cancelled' && (e.date >= todayStr || !e.date)
    ).length;
    const completedEvents = orgEvents.filter(e => e.status === 'Completed' || (e.date < todayStr && e.status === 'Published')).length;
    const draftEvents = orgEvents.filter(e => e.status === 'Draft').length;

    // Total registrations across all events for this organizer
    const orgEventIds = new Set(orgEvents.map(e => e._id));
    const totalRegistrations = orgEvents.reduce((acc, ev) => acc + (ev.registeredCount || 0), 0);

    const activeRegistrations = this.registrations.filter(r => orgEventIds.has(r.eventId));
    const attendedCount = activeRegistrations.filter(r => r.status === 'Attended').length;

    // Category breakdown
    const categoryMap = {};
    orgEvents.forEach(e => {
      categoryMap[e.category] = (categoryMap[e.category] || 0) + 1;
    });

    // Recent events
    const recentEvents = [...orgEvents]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    // Recent registrations
    const recentRegistrations = activeRegistrations
      .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt))
      .slice(0, 6);

    return {
      totalEvents,
      upcomingEvents,
      completedEvents,
      draftEvents,
      totalRegistrations,
      attendedCount,
      categoryDistribution: Object.entries(categoryMap).map(([name, count]) => ({ name, count })),
      recentEvents,
      recentRegistrations,
    };
  }
}

// Singleton instance
const store = new DataStore();

module.exports = store;
