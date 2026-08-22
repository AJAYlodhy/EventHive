/**
 * Mock Data Module for EventHive Admin Dashboard
 *
 * This module provides structured placeholder data for the admin dashboard.
 * Replace each function with actual database queries when the database layer
 * is implemented.
 *
 * Each function returns a Promise to match the async pattern of real DB calls.
 */

// --- Dashboard Statistics ---

async function getDashboardStats() {
  return {
    totalUsers: 1250,
    totalOrganizers: 48,
    totalEvents: 156,
    pendingApprovals: 12,
    serviceProviders: 34,
    pendingApplications: 7,
  };
}

// --- Recent Events ---

async function getRecentEvents() {
  return [
    {
      id: 1,
      title: 'Tech Summit 2026',
      organizer: 'CS Department',
      date: '2026-09-15',
      status: 'approved',
      attendees: 320,
    },
    {
      id: 2,
      title: 'Cultural Fest - Rhythm',
      organizer: 'Cultural Committee',
      date: '2026-09-20',
      status: 'approved',
      attendees: 580,
    },
    {
      id: 3,
      title: 'AI/ML Workshop',
      organizer: 'AI Club',
      date: '2026-09-25',
      status: 'pending',
      attendees: 0,
    },
    {
      id: 4,
      title: 'Sports Day 2026',
      organizer: 'Sports Committee',
      date: '2026-10-01',
      status: 'approved',
      attendees: 450,
    },
    {
      id: 5,
      title: 'Startup Pitch Night',
      organizer: 'E-Cell',
      date: '2026-10-05',
      status: 'pending',
      attendees: 0,
    },
  ];
}

// --- Pending Approvals ---

async function getPendingApprovals() {
  return [
    {
      id: 101,
      type: 'event',
      title: 'AI/ML Workshop',
      requestedBy: 'AI Club',
      requestedDate: '2026-08-18',
      description: 'Hands-on workshop on machine learning fundamentals',
    },
    {
      id: 102,
      type: 'event',
      title: 'Startup Pitch Night',
      requestedBy: 'E-Cell',
      requestedDate: '2026-08-19',
      description: 'Platform for student startups to pitch to investors',
    },
    {
      id: 103,
      type: 'organizer',
      title: 'New Organizer Registration',
      requestedBy: 'Priya Sharma',
      requestedDate: '2026-08-20',
      description: 'Request to register as event organizer for Debate Society',
    },
    {
      id: 104,
      type: 'service_provider',
      title: 'Catering Service Application',
      requestedBy: 'Campus Bites',
      requestedDate: '2026-08-21',
      description: 'Application to provide catering for campus events',
    },
  ];
}

module.exports = {
  getDashboardStats,
  getRecentEvents,
  getPendingApprovals,
};
