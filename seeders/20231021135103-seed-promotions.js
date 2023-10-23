'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('promotions', [
      {
        name: 'Summer Sale',
        description: 'Get great discounts on summer products.',
        discountPercentage:5,
        // startDate: new Date('2023-06-01'),
        // endDate: new Date('2023-08-31'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Winter Clearance',
        description: 'Clearance sale for winter items.',
        discountPercentage:10,
        // startDate: new Date('2023-12-01'),
        // endDate: new Date('2023-12-31'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more promotion data as needed
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('promotions', null, {});
  },
};
