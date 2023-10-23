const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Set up your database connection

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('customer', 'shopAdmin', 'systemAdmin'),
    allowNull: false,
  },
});

// Define an association to link User with Shop
User.associate = (models) => {
  User.belongsToMany(models.Shop, {
    as: 'managedShops',
    through: 'ShopAdmins', // This refers to the join table for the many-to-many relationship
  });
};

module.exports = User;
