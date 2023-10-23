'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('admin_password', 10); // Change 'admin_password' to the desired password
    const hashedPassword2 = await bcrypt.hash('customer_password', 10); // Change 'customer_password' to the desired password

    return queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: hashedPassword1,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin1',
        email: 'admin1@example.com',
        password: hashedPassword1,
        role: 'shopAdmin', // Use 'shopAdmin' to match the model definition
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'customer1',
        email: 'customer1@example.com',
        password: hashedPassword2,
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin2',
        email: 'admin2@example.com',
        password: hashedPassword1, // Use the same hashed password
        role: 'systemAdmin', // Add 'systemAdmin'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more user data as needed
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
