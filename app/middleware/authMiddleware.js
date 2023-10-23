const jwt = require('jsonwebtoken');
const  User  = require('../models/userModel');
require('dotenv').config();

// Authentication middleware to verify JWT token and check user roles
function authMiddleware(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ error: 'Access Denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the user data to the request for further processing
    req.user = decoded;

    // Check user role for authorization
    User.findOne({ where: { id: decoded.id } })
      .then((user) => {
        if (!user) {
          return res.status(401).json({ error: 'User not found.' });
        }

        // Check if the user role allows access to the specific route
        if (user.role === 'systemAdmin') {
          req.userRole = 'systemAdmin';
        } else if (user.role === 'shopAdmin') {
          req.userRole = 'shopAdmin';
        } else if (user.role === 'customer') {
          req.userRole = 'customer';
        } else {
          return res.status(403).json({ error: 'Access Denied. Invalid user role.' });
        }

        // Proceed to the next middleware or route
        next();
      })
      .catch((error) => {
        return res.status(500).json({ error: 'Internal Server Error.' });
      });
  } catch (error) {
    return res.status(400).json({ error: 'Invalid token.' });
  }
}

module.exports = authMiddleware;