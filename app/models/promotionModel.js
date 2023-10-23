const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Promotion = sequelize.define('Promotion', {
  // Define your Promotion model attributes here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  discountPercentage: {
    type: DataTypes.DECIMAL(5, 2),
    allowNull: false,
  },
});

// Define an association to link Promotion with Shop
Promotion.associate = (models) => {
  Promotion.belongsTo(models.Shop, {
    as: 'shop', // Alias for the association
  });
};

module.exports = Promotion;