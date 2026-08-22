const jwt = require('jsonwebtoken');
const store = require('../models/store');

const JWT_SECRET = process.env.JWT_SECRET || 'eventhive-jwt-secret-key-2026';

// Verify JWT token and attach user to req.user
const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);

      const user = store.findUserById(decoded.id);
      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'User no longer exists. Authorization denied.',
        });
      }

      req.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
        phone: user.phone,
        avatar: user.avatar,
      };

      return next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired authorization token.',
        error: error.message,
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No authorization token provided in request header.',
    });
  }
};

// Ensure user has Organizer role
const requireOrganizer = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required.',
    });
  }

  if (req.user.role !== 'organizer' && req.user.role !== 'admin') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Organizer privileges required.',
    });
  }

  next();
};

module.exports = {
  protect,
  requireOrganizer,
  JWT_SECRET,
};
