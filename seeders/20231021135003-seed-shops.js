'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('shops', [
      {
        name: 'Duty-Free Shop 1',
        location: 'Airport Terminal A',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Duty-Free Shop 2',
        location: 'Airport Terminal B',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      // Add more shop data as needed
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('shops', null, {});
  },
};
