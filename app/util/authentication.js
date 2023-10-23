const jwt = require('jsonwebtoken');
const  User  = require('../models/userModel'); // Import your User model
require('dotenv').config();

// Middleware to check if a user is authenticated
exports.authenticateUser = (req, res, next) => {
  const token = req.header('x-auth-token'); // Assuming you send the token in the 'x-auth-token' header

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Make sure to set the same secret used when creating the token

    // Attach the user ID to the request for later use
    req.user = decoded;

    // Continue with the next middleware or route
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// Middleware to check if a user is a system admin
exports.checkSystemAdmin = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);

    if (!user || user.role !== 'systemAdmin') {
      return res.status(403).json({ error: 'Access denied. You are not a system admin.' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Middleware to check if a user is a shop admin
exports.checkShopAdmin = async (req, res, next) => {
  const userId = req.user.id;

  try {
    const user = await User.findByPk(userId);

    if (!user || user.role !== 'shopAdmin') {
      return res.status(403).json({ error: 'Access denied. You are not a shop admin.' });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};