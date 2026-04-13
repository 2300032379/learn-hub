// Learning Hub Backend Server
// Express.js API Server

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:8000';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Learning Hub API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API documentation route
app.get('/api', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Learning Hub API',
    version: '1.0.0',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile',
        logout: 'POST /api/auth/logout',
        verify: 'POST /api/auth/verify'
      },
      content: {
        getAllSkills: 'GET /api/content/skills',
        getSkill: 'GET /api/content/skills/:id',
        getAllStories: 'GET /api/content/stories',
        getStory: 'GET /api/content/stories/:id',
        getAllNovels: 'GET /api/content/novels',
        getNovel: 'GET /api/content/novels/:id',
        getAllContent: 'GET /api/content/all'
      }
    }
  });
});

// Serve static files (optional)
// app.use(express.static(path.join(__dirname, '../')));

// 404 Middleware
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Unknown error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║          🎓 Learning Hub API Server Started 🚀            ║
║                                                            ║
║  Server is running on: http://localhost:${PORT}            ║
║  Environment: ${process.env.NODE_ENV || 'development'}                                 ║
║  Frontend URL: ${CLIENT_URL}          ║
║                                                            ║
║  📚 API Documentation: http://localhost:${PORT}/api           ║
║  ❤️  Health Check: http://localhost:${PORT}/api/health        ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});
