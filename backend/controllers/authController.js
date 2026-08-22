const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const store = require('../models/store');
const { JWT_SECRET } = require('../middleware/authMiddleware');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Authenticate User & get token
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both email and password.',
      });
    }

    const user = store.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. User not found.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials. Password does not match.',
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
        organization: user.organization,
        phone: user.phone,
        bio: user.bio,
        avatar: user.avatar,
        website: user.website,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message,
    });
  }
};

// @desc    Convenient Demo Login for Organizer Testing
// @route   POST /api/auth/demo-organizer
// @access  Public
const demoLogin = async (req, res) => {
  try {
    const email = req.body.email || 'alex.organizer@eventhive.com';
    const user = store.findUserByEmail(email) || store.users[0];

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
        organization: user.organization,
        phone: user.phone,
        bio: user.bio,
        avatar: user.avatar,
        website: user.website,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error during demo login',
      error: error.message,
    });
  }
};

// @desc    Register a new Organizer
// @route   POST /api/auth/register-organizer
// @access  Public
const registerOrganizer = async (req, res) => {
  try {
    const { name, email, password, organization, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required fields.',
      });
    }

    const existing = store.findUserByEmail(email);
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'A user with this email address already exists.',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = store.createUser({
      name,
      email,
      password: hashedPassword,
      role: 'organizer',
      organization: organization || 'EventHive Organizer',
      phone: phone || '',
      bio: 'Event host and community organizer on EventHive.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop&crop=face',
      website: '',
    });

    const token = generateToken(newUser._id);

    return res.status(201).json({
      success: true,
      message: 'Organizer registered successfully',
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
    return res.status(500).json({
      success: false,
      message: 'Error registering organizer',
      error: error.message,
    });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = store.findUserById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        organization: user.organization,
        phone: user.phone,
        bio: user.bio,
        avatar: user.avatar,
        website: user.website,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error fetching current user profile',
      error: error.message,
    });
  }
};

module.exports = {
  login,
  demoLogin,
  registerOrganizer,
  getMe,
};
