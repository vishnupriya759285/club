/**
 * Authentication Controller
 * Handles user registration, login, and profile management
 */

const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user (student or teacher)
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { name, email, rollNumber, password, role, department, year } = req.body;

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if role is student and rollNumber is provided
    if (role === 'student' && !rollNumber) {
      return res.status(400).json({
        success: false,
        message: 'Roll number is required for students'
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [
        { email },
        ...(rollNumber ? [{ rollNumber }] : [])
      ]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email or roll number'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      rollNumber: role === 'student' ? rollNumber : null,
      password,
      role,
      department,
      year
    });

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          rollNumber: user.rollNumber,
          role: user.role,
          department: user.department,
          year: user.year
        },
        token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during registration'
    });
  }
};

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password, rollNumber } = req.body;

    // Validate input
    if ((!email && !rollNumber) || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/roll number and password'
      });
    }

    // Find user by email or roll number
    const user = await User.findOne({
      $or: [
        ...(email ? [{ email }] : []),
        ...(rollNumber ? [{ rollNumber }] : [])
      ]
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if user is active
    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Your account has been deactivated'
      });
    }

    // Verify password
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          rollNumber: user.rollNumber,
          role: user.role,
          department: user.department,
          year: user.year
        },
        token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error during login'
    });
  }
};

/**
 * @route   GET /api/auth/me
 * @desc    Get current logged in user
 * @access  Private
 */
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      data: {
        user
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error'
    });
  }
};

module.exports = {
  register,
  login,
  getMe
};
