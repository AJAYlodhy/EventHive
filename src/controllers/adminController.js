const ejs = require('ejs');
const path = require('path');
const mockData = require('../data/mockData');

const viewsDir = path.join(__dirname, '..', 'views');

/**
 * Helper to render an EJS sub-view inside the adminLayout.
 */
async function renderAdminView(res, viewRelativePath, data = {}, layoutOptions = {}) {
  try {
    const notifications = await mockData.getNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;

    const content = await new Promise((resolve, reject) => {
      ejs.renderFile(
        path.join(viewsDir, viewRelativePath),
        { ...data, unreadCount },
        (err, str) => {
          if (err) return reject(err);
          resolve(str);
        }
      );
    });

    res.render('layouts/adminLayout', {
      pageTitle: layoutOptions.pageTitle || 'Admin',
      activePage: layoutOptions.activePage || 'dashboard',
      unreadCount,
      alert: layoutOptions.alert || null,
      adminUser: res.locals.adminUser || { name: 'Administrator', email: 'admin@eventhive.com' },
      content
    });
  } catch (err) {
    console.error('Error rendering admin view:', err);
    res.status(500).send('Internal Server Error: ' + err.message);
  }
}

// =========================================================================
// 1. AUTHENTICATION
// =========================================================================

function getLoginPage(req, res) {
  const error = req.query.error || null;
  const message = req.query.message || null;
  res.render('admin/login', { error, message });
}

function postLogin(req, res) {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@eventhive.com';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (!email || !password) {
    return res.render('admin/login', {
      error: 'Please provide both email and password.',
      message: null
    });
  }

  if (email.trim().toLowerCase() === adminEmail.toLowerCase() && password === adminPass) {
    // Set cookie for session authentication
    res.cookie('eh_admin_session', 'authenticated_admin_session_token', {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    return res.redirect('/admin/dashboard');
  }

  return res.render('admin/login', {
    error: 'Invalid administrator email or password.',
    message: null
  });
}

function logout(req, res) {
  res.clearCookie('eh_admin_session');
  res.redirect('/admin/login?message=' + encodeURIComponent('Logged out successfully.'));
}

// =========================================================================
// 2. DASHBOARD
// =========================================================================

async function getDashboard(req, res) {
  try {
    const [stats, recentEvents, pendingApprovals] = await Promise.all([
      mockData.getDashboardStats(),
      mockData.getRecentEvents(),
      mockData.getPendingApprovals()
    ]);

    await renderAdminView(
      res,
      'admin/dashboard.ejs',
      { stats, recentEvents, pendingApprovals },
      { pageTitle: 'Dashboard', activePage: 'dashboard' }
    );
  } catch (err) {
    console.error('getDashboard error:', err);
    res.status(500).send('Error loading dashboard');
  }
}

// =========================================================================
// 3. USER MANAGEMENT
// =========================================================================

async function getUsers(req, res) {
  try {
    const { search, role, status } = req.query;
    const users = await mockData.getAllUsers({ search, role, status });

    await renderAdminView(
      res,
      'admin/users.ejs',
      {
        users,
        filters: {
          search: search || '',
          role: role || 'All',
          status: status || 'All'
        },
        alert: req.query.alert || null
      },
      { pageTitle: 'User Management', activePage: 'users' }
    );
  } catch (err) {
    console.error('getUsers error:', err);
    res.status(500).send('Error loading users');
  }
}

async function postToggleUserStatus(req, res) {
  try {
    const user = await mockData.toggleUserStatus(req.params.id);
    const msg = user ? `User ${user.name} is now ${user.status}.` : 'User not found.';
    res.redirect('/admin/users?alert=' + encodeURIComponent(msg));
  } catch (err) {
    res.redirect('/admin/users?alert=' + encodeURIComponent('Failed to update user status.'));
  }
}

async function postDeleteUser(req, res) {
  try {
    const deleted = await mockData.deleteUser(req.params.id);
    const msg = deleted ? `User ${deleted.name} deleted successfully.` : 'User not found.';
    res.redirect('/admin/users?alert=' + encodeURIComponent(msg));
  } catch (err) {
    res.redirect('/admin/users?alert=' + encodeURIComponent('Failed to delete user.'));
  }
}

// =========================================================================
// 4. ORGANIZER MANAGEMENT
// =========================================================================

async function getOrganizers(req, res) {
  try {
    const { search, status } = req.query;
    const organizers = await mockData.getAllOrganizers({ search, status });

    await renderAdminView(
      res,
      'admin/organizers.ejs',
      {
        organizers,
        filters: { search: search || '', status: status || 'All' },
        alert: req.query.alert || null
      },
      { pageTitle: 'Organizer Management', activePage: 'organizers' }
    );
  } catch (err) {
    console.error('getOrganizers error:', err);
    res.status(500).send('Error loading organizers');
  }
}

async function postApproveOrganizer(req, res) {
  try {
    await mockData.updateOrganizerStatus(req.params.id, 'Approved');
    res.redirect('/admin/organizers?alert=' + encodeURIComponent('Organizer verified & approved.'));
  } catch (err) {
    res.redirect('/admin/organizers?alert=' + encodeURIComponent('Action failed.'));
  }
}

async function postRejectOrganizer(req, res) {
  try {
    await mockData.updateOrganizerStatus(req.params.id, 'Rejected');
    res.redirect('/admin/organizers?alert=' + encodeURIComponent('Organizer registration rejected.'));
  } catch (err) {
    res.redirect('/admin/organizers?alert=' + encodeURIComponent('Action failed.'));
  }
}

// =========================================================================
// 5. EVENT MANAGEMENT
// =========================================================================

async function getEvents(req, res) {
  try {
    const { search, status, category } = req.query;
    const events = await mockData.getAllEvents({ search, status, category });

    await renderAdminView(
      res,
      'admin/events.ejs',
      {
        events,
        filters: {
          search: search || '',
          status: status || 'All',
          category: category || 'All'
        },
        alert: req.query.alert || null
      },
      { pageTitle: 'Event Management', activePage: 'events' }
    );
  } catch (err) {
    console.error('getEvents error:', err);
    res.status(500).send('Error loading events');
  }
}

async function postApproveEvent(req, res) {
  try {
    await mockData.updateEventStatus(req.params.id, 'approved');
    res.redirect('/admin/events?alert=' + encodeURIComponent('Event approved and published live.'));
  } catch (err) {
    res.redirect('/admin/events?alert=' + encodeURIComponent('Approval failed.'));
  }
}

async function postRejectEvent(req, res) {
  try {
    await mockData.updateEventStatus(req.params.id, 'rejected');
    res.redirect('/admin/events?alert=' + encodeURIComponent('Event rejected.'));
  } catch (err) {
    res.redirect('/admin/events?alert=' + encodeURIComponent('Rejection failed.'));
  }
}

async function postDeleteEvent(req, res) {
  try {
    await mockData.deleteEvent(req.params.id);
    res.redirect('/admin/events?alert=' + encodeURIComponent('Event deleted successfully.'));
  } catch (err) {
    res.redirect('/admin/events?alert=' + encodeURIComponent('Delete failed.'));
  }
}

// =========================================================================
// 6. SERVICE PROVIDER MANAGEMENT
// =========================================================================

async function getProviders(req, res) {
  try {
    const { search, category, status } = req.query;
    const providers = await mockData.getAllProviders({ search, category, status });

    await renderAdminView(
      res,
      'admin/providers.ejs',
      {
        providers,
        filters: {
          search: search || '',
          category: category || 'All',
          status: status || 'All'
        },
        alert: req.query.alert || null
      },
      { pageTitle: 'Service Providers', activePage: 'providers' }
    );
  } catch (err) {
    console.error('getProviders error:', err);
    res.status(500).send('Error loading providers');
  }
}

async function postApproveProvider(req, res) {
  try {
    await mockData.updateProviderStatus(req.params.id, 'Approved');
    res.redirect('/admin/providers?alert=' + encodeURIComponent('Service Provider approved.'));
  } catch (err) {
    res.redirect('/admin/providers?alert=' + encodeURIComponent('Approval failed.'));
  }
}

async function postRejectProvider(req, res) {
  try {
    await mockData.updateProviderStatus(req.params.id, 'Rejected');
    res.redirect('/admin/providers?alert=' + encodeURIComponent('Service Provider rejected.'));
  } catch (err) {
    res.redirect('/admin/providers?alert=' + encodeURIComponent('Rejection failed.'));
  }
}

// =========================================================================
// 7. EVENT APPLICATIONS MANAGEMENT
// =========================================================================

async function getApplications(req, res) {
  try {
    const { search, status, eventId } = req.query;
    const [applicationsList, allEvents] = await Promise.all([
      mockData.getAllApplications({ search, status, eventId }),
      mockData.getAllEvents()
    ]);

    await renderAdminView(
      res,
      'admin/applications.ejs',
      {
        applications: applicationsList,
        events: allEvents,
        filters: {
          search: search || '',
          status: status || 'All',
          eventId: eventId || 'All'
        },
        alert: req.query.alert || null
      },
      { pageTitle: 'Event Applications', activePage: 'applications' }
    );
  } catch (err) {
    console.error('getApplications error:', err);
    res.status(500).send('Error loading applications');
  }
}

async function postAcceptApplication(req, res) {
  try {
    await mockData.updateApplicationStatus(req.params.id, 'Accepted');
    res.redirect('/admin/applications?alert=' + encodeURIComponent('Application accepted.'));
  } catch (err) {
    res.redirect('/admin/applications?alert=' + encodeURIComponent('Action failed.'));
  }
}

async function postRejectApplication(req, res) {
  try {
    await mockData.updateApplicationStatus(req.params.id, 'Rejected');
    res.redirect('/admin/applications?alert=' + encodeURIComponent('Application rejected.'));
  } catch (err) {
    res.redirect('/admin/applications?alert=' + encodeURIComponent('Action failed.'));
  }
}

// =========================================================================
// 8. NOTIFICATIONS
// =========================================================================

async function getNotifications(req, res) {
  try {
    const notificationsList = await mockData.getNotifications();

    await renderAdminView(
      res,
      'admin/notifications.ejs',
      {
        notifications: notificationsList,
        alert: req.query.alert || null
      },
      { pageTitle: 'Admin Notifications', activePage: 'notifications' }
    );
  } catch (err) {
    console.error('getNotifications error:', err);
    res.status(500).send('Error loading notifications');
  }
}

async function postMarkNotificationsRead(req, res) {
  try {
    await mockData.markAllNotificationsRead();
    res.redirect('/admin/notifications?alert=' + encodeURIComponent('All notifications marked as read.'));
  } catch (err) {
    res.redirect('/admin/notifications');
  }
}

// =========================================================================
// 9. REPORTS & ANALYTICS
// =========================================================================

async function getReports(req, res) {
  try {
    const reportsData = await mockData.getAdminReports();

    await renderAdminView(
      res,
      'admin/reports.ejs',
      {
        reports: reportsData,
        alert: req.query.alert || null
      },
      { pageTitle: 'Reports & Analytics', activePage: 'reports' }
    );
  } catch (err) {
    console.error('getReports error:', err);
    res.status(500).send('Error loading reports');
  }
}

module.exports = {
  getLoginPage,
  postLogin,
  logout,
  getDashboard,
  getUsers,
  postToggleUserStatus,
  deleteUser: postDeleteUser,
  getOrganizers,
  postApproveOrganizer,
  postRejectOrganizer,
  getEvents,
  postApproveEvent,
  postRejectEvent,
  postDeleteEvent,
  getProviders,
  postApproveProvider,
  postRejectProvider,
  getApplications,
  postAcceptApplication,
  postRejectApplication,
  getNotifications,
  postMarkNotificationsRead,
  getReports
};
