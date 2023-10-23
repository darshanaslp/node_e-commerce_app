// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/database');

// const Order = sequelize.define('Order', {
//   // Define order attributes
//   // For example:
//   orderNumber: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
// });

// // Define associations
// Order.associate = (models) => {
//   Order.hasMany(models.OrderItem, { as: 'items' });
// };

// module.exports = Order;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Import your database connection

const Order = sequelize.define('Order', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define associations
Order.associate = (models) => {
  Order.hasMany(models.OrderItem, {
    as: 'orderItems',
    foreignKey: 'orderId',
  });
};

module.exports = Order;