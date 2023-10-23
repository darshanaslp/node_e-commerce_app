const { Order, OrderItem } = require('../models');
const { ErrorHandler } = require('../util/errorHandling');

// Function to create a new order
exports.createOrder = async (userId, orderData) => {
  try {
    const order = await Order.create({ userId, ...orderData });
    return order;
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};

// Function to get a user's orders
exports.getUserOrders = async (userId) => {
  try {
    const orders = await Order.findAll({ where: { userId } });
    return orders;
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};

// Function to get order details by ID
exports.getOrderById = async (orderId) => {
  try {
    const order = await Order.findByPk(orderId, {
      include: OrderItem,
    });

    if (!order) {
      throw new ErrorHandler(404, 'Order not found');
    }

    return order;
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};