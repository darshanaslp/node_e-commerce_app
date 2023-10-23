const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CartItem = sequelize.define('CartItem', {
  // Define cart item attributes
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cartId:{
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

// Define associations
CartItem.associate = (models) => {
  // A CartItem belongs to a Cart
  CartItem.belongsTo(models.Cart, { as: 'cart' });
};

module.exports = CartItem;