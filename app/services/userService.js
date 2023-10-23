const  User  = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validateUserRegistration, validateUserLogin } = require('../util/validation');
require('dotenv').config();

// Function to register a new user
exports.register = async (userData) => {
  try {
    const { username, email, password } = userData;

    // Validate the user registration data
    const { error } = validateUserRegistration(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Check if the user with the same email or username already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User with the same email already exists');
    }

    // Hash the password before saving it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = await User.create({ username, email, password: hashedPassword, role: 'customer' });

    return newUser;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Function to handle user login
exports.login = async (email, password) => {
  try {
    // Validate the user login data
    const { error } = validateUserLogin({ email, password });
    if (error) {
      throw new Error(error.details[0].message);
    }

    // Check if the user with the provided email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    // Create a JWT token for authentication
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    return token;
  } catch (error) {
    throw new Error(error.message);
  }
};