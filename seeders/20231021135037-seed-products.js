'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [
      {
        name: 'Product 1',
        description: 'Description for Product 1',
        price: 25.99,
        stock: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Product 2',
        description: 'Description for Product 2',
        price: 19.99,
        stock: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  },
};
