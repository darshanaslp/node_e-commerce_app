'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const adminPassword = await bcrypt.hash('admin_password', 10); // Change 'admin_password' to the desired password
    const customerPassword = await bcrypt.hash('customer_password', 10); // Change 'customer_password' to the desired password
	const shopAdminPassword = await bcrypt.hash('shopadmin_password', 10); // Change 'shopadmin_password' to the desired password
	const systemAdminPassword = await bcrypt.hash('systemadmin_password', 10); // Change 'systemadmin_password' to the desired password

    return queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin1',
        email: 'admin1@example.com',
        password: shopAdminPassword,
        role: 'shopAdmin', // Use 'shopAdmin' to match the model definition
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'customer1',
        email: 'customer1@example.com',
        password: customerPassword,
        role: 'customer',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'admin2',
        email: 'admin2@example.com',
        password: systemAdminPassword, // Use the same hashed password
        role: 'systemAdmin', // Add 'systemAdmin'
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
