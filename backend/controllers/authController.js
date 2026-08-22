const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const store = require('../models/store');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Authenticate User & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password || !email.trim() || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const cleanEmail = email.trim().toLowerCase();
    const user = store.findUserByEmail(cleanEmail);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User with this email does not exist.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Incorrect password.',
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization || '',
        phone: user.phone || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        website: user.website || '',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during login. Please try again.',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message,
    });
  }
};

// @desc    Convenient Demo Login for Organizer Testing
// @route   POST /api/auth/demo-organizer
// @access  Public
const demoLogin = async (req, res) => {
  try {
    const { email } = req.body || {};
    const targetEmail = (email && email.trim()) ? email.trim().toLowerCase() : 'alex.organizer@eventhive.com';
    const user = store.findUserByEmail(targetEmail) || store.users[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Demo organizer account not found.',
      });
    }

    const token = generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: `Logged in as Demo Organizer: ${user.name}`,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization || '',
        phone: user.phone || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        website: user.website || '',
      },
    });
  } catch (error) {
    console.error('Demo login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error during demo login',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message,
    });
  }
};

// @desc    Register a new Organizer
// @route   POST /api/auth/register-organizer
// @access  Public
const registerOrganizer = async (req, res) => {
  try {
    const { name, email, password, organization, phone } = req.body || {};

    // 1. Validate required fields presence
    if (!name || !name.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Organizer / Host name is required.',
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Email address is required.',
      });
    }

    if (!password || !password.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Password is required.',
      });
    }

    // 2. Validate email format
    const cleanEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address (e.g. host@eventhive.com).',
      });
    }

    // 3. Validate password strength
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters in length.',
      });
    }

    // 4. Check for duplicate email
    const existing = store.findUserByEmail(cleanEmail);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'An account with this email address already exists. Please sign in instead.',
      });
    }

    // 5. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Create User
    const newUser = store.createUser({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
      role: 'organizer',
      organization: organization ? organization.trim() : 'EventHive Host Chapter',
      phone: phone ? phone.trim() : '',
      bio: 'Event host and community organizer on EventHive.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face',
      website: '',
    });

    const token = generateToken(newUser._id);

    return res.status(201).json({
      success: true,
      message: 'Organizer registered successfully!',
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        organization: newUser.organization,
        phone: newUser.phone,
        bio: newUser.bio,
        avatar: newUser.avatar,
        website: newUser.website,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error during registration. Please try again.',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message,
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized. Invalid session.',
      });
    }

    const user = store.findUserById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User profile not found.',
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization || '',
        phone: user.phone || '',
        bio: user.bio || '',
        avatar: user.avatar || '',
        website: user.website || '',
      },
    });
  } catch (error) {
    console.error('getMe error:', error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching user profile',
      error: process.env.NODE_ENV === 'production' ? undefined : error.message,
    });
  }
};

module.exports = {
  login,
  demoLogin,
  registerOrganizer,
  getMe,
};
