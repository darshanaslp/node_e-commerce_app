const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define('Cart', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Define associations
Cart.associate = (models) => {
  // A Cart can have multiple CartItems
  Cart.hasMany(models.CartItem, { as: 'items' });
};

module.exports = Cart;