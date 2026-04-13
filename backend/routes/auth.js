// Authentication Routes

const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { generateToken, verifyToken } = require('../middleware/auth');

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Validation
    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required.'
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long.'
      });
    }

    // Create user
    const result = db.createUser(username, email, password);

    if (!result.success) {
      return res.status(400).json(result);
    }

    res.status(201).json({
      success: true,
      message: 'User created successfully. Please log in.',
      user: result.user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    // Validation
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.'
      });
    }

    // Find user
    const user = db.findUser(username, username); // Check both username and email

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    // Verify password
    if (!db.verifyPassword(user, password)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid username or password.'
      });
    }

    // Generate token
    const token = generateToken(user.id, user.username, user.email);

    res.status(200).json({
      success: true,
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
});

// @route   GET /api/auth/profile
// @desc    Get current user profile
// @access  Private (Requires auth token)
router.get('/profile', verifyToken, (req, res) => {
  try {
    const user = db.findUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (frontend should clear token)
// @access  Private
router.post('/logout', verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logout successful. Please clear your token on the client.'
  });
});

// @route   POST /api/auth/verify
// @desc    Verify token
// @access  Private
router.post('/verify', verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Token is valid.',
    user: req.user
  });
});

module.exports = router;
