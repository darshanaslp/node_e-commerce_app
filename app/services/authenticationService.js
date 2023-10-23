const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const  User  = require('../models/userModel');
const { ErrorHandler } = require('../util/errorHandling');
require('dotenv').config();

// Function to authenticate a user (login)
exports.authenticate = async (email, password) => {
  try {
    // Find the user with the provided email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new ErrorHandler(401, 'Invalid credentials');
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new ErrorHandler(401, 'Invalid credentials');
    }

    // Create a JWT token for authentication
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    // Return the token
    return token;
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};