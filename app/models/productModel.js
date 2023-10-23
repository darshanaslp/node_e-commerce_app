// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); // Set up your database connection

// const Product = sequelize.define('Product', {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   price: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false,
//   },
//   stock: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//   },
//   // Add other product properties as needed
// });

// module.exports = Product;



const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  ShopId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define an association to link Product with Shop
Product.associate = (models) => {
  Product.belongsTo(models.Shop, {
    as: 'shop', // Alias for the association
  });
};

module.exports = Product;