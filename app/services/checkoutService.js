const  Cart = require('../models/cartModel');
const CartItem = require('../models/cartItemModel')
const Order = require('../models/orderModel');
const OrderItem = require('../models/orderItemModel');
const Product  = require('../models/productModel');
const { ErrorHandler } = require('../util/errorHandling');

// Function to process a checkout and create an order
exports.checkout = async (userId) => {
  try {
    // Find the user's cart
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      throw new ErrorHandler(404, 'Cart not found');
    }

    // Find cart items for the user
    const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });

    if (cartItems.length === 0) {
      throw new ErrorHandler(400, 'Cart is empty');
    }

    // Create a new order
    const order = await Order.create({ userId });

    // Loop through the cart items, move them to the order, and calculate the total cost
    let totalCost = 0;
    for (const cartItem of cartItems) {
      const { productId, quantity } = cartItem;

      // Find the product associated with the cart item
      const product = await Product.findByPk(productId);

      if (!product) {
        throw new ErrorHandler(404, 'Product not found');
      }

      // Calculate the cost for this item (you might consider any discounts here)
      const itemCost = product.price * quantity;

      // Add the item to the order
      const orderItem = await OrderItem.create({
        orderId: order.id,
        productId,
        quantity,
        cost: itemCost,
      });

      // Calculate the total cost for the order
      totalCost += itemCost;

      // Remove the cart item
      await cartItem.destroy();
    }

    // Update the order with the total cost
    order.totalCost = totalCost;
    await order.save();

    return 'Order created successfully';
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};