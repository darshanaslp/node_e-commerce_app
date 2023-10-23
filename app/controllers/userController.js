const  User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const { validateUserRegistration, validateUserLogin, validateUserProfileUpdate } = require('../util/validation'); // Import the validation functions
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;


    // Validate the user registration data
    const { error } = validateUserRegistration(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the user with the same email or username already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User with the same email already exists' });
    }

    // Hash the password before saving it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user
    const newUser = await User.create({ username, email, password: hashedPassword, role: 'customer' });

    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the user login data
    const { error } = validateUserLogin(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    // Check if the user with the provided email exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Create a JWT token for authentication
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get user profile (for authenticated users)
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['password'] }, // Exclude password from the response
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update user profile (for authenticated users)
exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username, email } = req.body;

     // Validate the user profile update data
     const { error } = validateUserProfileUpdate(req.body);
     if (error) {
       return res.status(400).json({ error: error.details[0].message });
     }

    // Check if the new email already exists for another user
    const existingUser = await User.findOne({ where: { email, id: { [Op.not]: userId } } });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use by another user' });
    }

    const updatedUser = await User.update(
      { username, email },
      { where: { id: userId } }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get GDPR data for a user (for authenticated users)
exports.getGDPRData = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId, {
      attributes: ['username', 'email'], // Define the data you want to provide as GDPR data
    });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete user account (for authenticated users)
exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Implement logic to delete the user's account, e.g., set an "isDeleted" flag

    res.json({ message: 'User account deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Import your User entity
// const { User } = require('../models/userModel');
// const { getRepository } = require('typeorm');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const { validateUserRegistration } = require('../util/validation');

// exports.register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     const userRepository = getRepository(User);

//     // Validate the user registration data
//     const { error } = validateUserRegistration(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     // Check if the user with the same email already exists
//     const existingUser = await userRepository.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(400).json({ error: 'User with the same email already exists' });
//     }

//     // Hash the password before saving it
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);

//     // Create a new user
//     const newUser = userRepository.create({
//       username,
//       email,
//       password: hashedPassword,
//       role: 'customer',
//     });

//     await userRepository.save(newUser);

//     res.status(201).json(newUser);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };


// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const userRepository = getRepository(User);

//     // Validate the user login data
//     const { error } = validateUserLogin(req.body);
//     if (error) {
//       return res.status(400).json({ error: error.details[0].message });
//     }

//     // Check if the user with the provided email exists
//     const user = await userRepository.findOne({ where: { email } });
//     if (!user) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Compare the provided password with the stored hashed password
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }

//     // Create a JWT token for authentication
//     const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
//       expiresIn: '1h', // Token expires in 1 hour
//     });

//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };