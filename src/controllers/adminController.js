const ejs = require('ejs');
const path = require('path');
const {
  getDashboardStats,
  getRecentEvents,
  getPendingApprovals,
} = require('../data/mockData');

/**
 * Render the admin dashboard page.
 * Fetches stats, recent events, and pending approvals,
 * renders the dashboard partial, then wraps it in the admin layout.
 */
async function getDashboard(req, res) {
  try {
    const [stats, recentEvents, pendingApprovals] = await Promise.all([
      getDashboardStats(),
      getRecentEvents(),
      getPendingApprovals(),
    ]);

    const viewsDir = path.join(__dirname, '..', 'views');

    // Render the dashboard content partial
    const content = await new Promise((resolve, reject) => {
      ejs.renderFile(
        path.join(viewsDir, 'admin', 'dashboard.ejs'),
        { stats, recentEvents, pendingApprovals },
        (err, html) => (err ? reject(err) : resolve(html))
      );
    });

    // Render the layout with the dashboard content injected
    res.render('layouts/adminLayout', {
      pageTitle: 'Admin Dashboard',
      activePage: 'dashboard',
      content,
    });
  } catch (error) {
    console.error('Error loading admin dashboard:', error);
    res.status(500).send('Error loading dashboard');
  }
}

/**
 * Return dashboard stats as JSON (for future AJAX/API use).
 */
async function getStatsAPI(req, res) {
  try {
    const stats = await getDashboardStats();
    res.json({ success: true, data: stats });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Error fetching stats' });
  }
}

module.exports = {
  getDashboard,
  getStatsAPI,
};
