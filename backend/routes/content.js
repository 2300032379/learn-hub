// Content Routes (Skills, Stories, Novels)

const express = require('express');
const router = express.Router();
const db = require('../models/db');
const { verifyToken } = require('../middleware/auth');

// Initialize content on startup
db.initializeContent();

// @route   GET /api/content/skills
// @desc    Get all skills
// @access  Public
router.get('/skills', (req, res) => {
  try {
    const content = db.getAllContent();
    res.status(200).json({
      success: true,
      data: content.skills || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skills',
      error: error.message
    });
  }
});

// @route   GET /api/content/skills/:id
// @desc    Get specific skill by ID
// @access  Public
router.get('/skills/:id', (req, res) => {
  try {
    const content = db.getAllContent();
    const skill = content.skills.find(s => s.id === req.params.id);

    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: skill
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skill',
      error: error.message
    });
  }
});

// @route   GET /api/content/stories
// @desc    Get all stories
// @access  Public
router.get('/stories', (req, res) => {
  try {
    const content = db.getAllContent();
    res.status(200).json({
      success: true,
      data: content.stories || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching stories',
      error: error.message
    });
  }
});

// @route   GET /api/content/stories/:id
// @desc    Get specific story by ID
// @access  Public
router.get('/stories/:id', (req, res) => {
  try {
    const content = db.getAllContent();
    const story = content.stories.find(s => s.id === req.params.id);

    if (!story) {
      return res.status(404).json({
        success: false,
        message: 'Story not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: story
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching story',
      error: error.message
    });
  }
});

// @route   GET /api/content/novels
// @desc    Get all novels
// @access  Public
router.get('/novels', (req, res) => {
  try {
    const content = db.getAllContent();
    res.status(200).json({
      success: true,
      data: content.novels || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching novels',
      error: error.message
    });
  }
});

// @route   GET /api/content/novels/:id
// @desc    Get specific novel by ID
// @access  Public
router.get('/novels/:id', (req, res) => {
  try {
    const content = db.getAllContent();
    const novel = content.novels.find(n => n.id === req.params.id);

    if (!novel) {
      return res.status(404).json({
        success: false,
        message: 'Novel not found.'
      });
    }

    res.status(200).json({
      success: true,
      data: novel
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching novel',
      error: error.message
    });
  }
});

// @route   GET /api/content/all
// @desc    Get all content
// @access  Public
router.get('/all', (req, res) => {
  try {
    const content = db.getAllContent();
    res.status(200).json({
      success: true,
      data: content
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching content',
      error: error.message
    });
  }
});

module.exports = router;
