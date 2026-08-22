/**
 * Admin Authentication & Session Middleware
 */

// Simple development session/cookie parser helper without extra heavy dependencies
function parseCookies(req) {
  const list = {};
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return list;

  cookieHeader.split(';').forEach(cookie => {
    let [name, ...rest] = cookie.split('=');
    name = name.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    if (!value) return;
    list[name] = decodeURIComponent(value);
  });
  return list;
}

/**
 * Middleware to check if the user is authenticated as an admin.
 * If not authenticated, redirects to /admin/login.
 */
function requireAdmin(req, res, next) {
  const cookies = parseCookies(req);
  const adminToken = cookies.eh_admin_session;

  // Verify session token
  if (adminToken && adminToken === 'authenticated_admin_session_token') {
    req.admin = {
      id: 'ADM-01',
      name: process.env.ADMIN_NAME || 'Super Administrator',
      email: process.env.ADMIN_EMAIL || 'admin@eventhive.com',
      role: 'Administrator'
    };
    res.locals.adminUser = req.admin;
    return next();
  }

  // Not authenticated -> redirect to login
  if (req.xhr || req.headers.accept?.indexOf('json') > -1) {
    return res.status(401).json({ error: 'Unauthorized. Admin session required.' });
  }

  return res.redirect('/admin/login?redirect=' + encodeURIComponent(req.originalUrl));
}

/**
 * Middleware for the login page: If already logged in, redirects directly to dashboard.
 */
function redirectIfAuthenticated(req, res, next) {
  const cookies = parseCookies(req);
  const adminToken = cookies.eh_admin_session;

  if (adminToken && adminToken === 'authenticated_admin_session_token') {
    return res.redirect('/admin/dashboard');
  }
  next();
}

module.exports = {
  requireAdmin,
  redirectIfAuthenticated
};
