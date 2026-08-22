const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database if URI available
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'EventHive Backend API',
    timestamp: new Date().toISOString(),
    module: 'Organizer / Host & Auth Active',
  });
});

// Mount Routes
const authRoutes = require('./routes/authRoutes');
const organizerRoutes = require('./routes/organizerRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/organizer', organizerRoutes);

// Root Endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'EventHive API Server',
    version: '1.0.0',
    description: 'Event Management System - Organizer/Host Module',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      organizer: '/api/organizer',
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Start Server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`========================================`);
    console.log(`🚀 EventHive Backend running on port ${PORT}`);
    console.log(`📡 URL: http://localhost:${PORT}`);
    console.log(`📊 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`🎯 Organizer Module API: http://localhost:${PORT}/api/organizer`);
    console.log(`========================================`);
  });
}

module.exports = app;
