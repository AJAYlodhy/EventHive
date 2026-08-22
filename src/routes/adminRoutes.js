const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { requireAdmin, redirectIfAuthenticated } = require('../middleware/auth');

// =========================================================================
// AUTHENTICATION ROUTES (Public to admins)
// =========================================================================
router.get('/login', redirectIfAuthenticated, adminController.getLoginPage);
router.post('/login', redirectIfAuthenticated, adminController.postLogin);
router.get('/logout', adminController.logout);

// =========================================================================
// PROTECTED ADMIN ROUTES
// =========================================================================
router.use(requireAdmin);

// Dashboard
router.get('/dashboard', adminController.getDashboard);

// 1. User Management
router.get('/users', adminController.getUsers);
router.post('/users/:id/status', adminController.postToggleUserStatus);
router.post('/users/:id/delete', adminController.deleteUser);

// 2. Organizer Management
router.get('/organizers', adminController.getOrganizers);
router.post('/organizers/:id/approve', adminController.postApproveOrganizer);
router.post('/organizers/:id/reject', adminController.postRejectOrganizer);

// 3. Event Management & Approvals
router.get('/events', adminController.getEvents);
router.get('/approvals', (req, res) => res.redirect('/admin/events?status=pending'));
router.post('/events/:id/approve', adminController.postApproveEvent);
router.post('/events/:id/reject', adminController.postRejectEvent);
router.post('/events/:id/delete', adminController.postDeleteEvent);

// 4. Service Providers
router.get('/providers', adminController.getProviders);
router.post('/providers/:id/approve', adminController.postApproveProvider);
router.post('/providers/:id/reject', adminController.postRejectProvider);

// 5. Event Applications
router.get('/applications', adminController.getApplications);
router.post('/applications/:id/accept', adminController.postAcceptApplication);
router.post('/applications/:id/reject', adminController.postRejectApplication);

// 6. Notifications
router.get('/notifications', adminController.getNotifications);
router.post('/notifications/mark-read', adminController.postMarkNotificationsRead);

// 7. Reports & Analytics
router.get('/reports', adminController.getReports);

module.exports = router;
