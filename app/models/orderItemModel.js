const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your database connection

const OrderItem = sequelize.define('OrderItem', {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

// Define associations
OrderItem.associate = (models) => {
  OrderItem.belongsTo(models.Order, {
    foreignKey: 'orderId',
    as: 'order',
  });
};

module.exports = OrderItem;