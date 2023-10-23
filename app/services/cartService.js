const  Cart = require('../models/cartModel');
const CartItem  = require('../models/cartItemModel');
const { ErrorHandler } = require('../util/errorHandling');


// Cart and CartItem Relationship (One-to-Many)
// Cart.hasMany(CartItem, { as: 'items' });
// CartItem.belongsTo(Cart);

// Function to add a product to the cart
exports.addToCart = async (userId, productId, quantity) => {
  try {
    const [cart, created] = await Cart.findOrCreate({
      where: { userId },
      defaults: { userId },
    });

    let cartItem = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({
        cartId: cart.id,
        productId,
        quantity,
      });
    }

    return cartItem;
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};

// Function to get the user's cart
exports.getCart = async (userId) => {
  try {
    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) {
      throw new ErrorHandler(404, 'Cart not found');
    }

    const cartItems = await CartItem.findAll({ where: { cartId: cart.id } });

    return { cart, cartItems };
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};

// Function to update the quantity of a product in the cart
exports.updateCartItemQuantity = async (cartItemId, newQuantity) => {
  try {
    const cartItem = await CartItem.findByPk(cartItemId);
    if (!cartItem) {
      throw new ErrorHandler(404, 'Cart item not found');
    }

    cartItem.quantity = newQuantity;
    await cartItem.save();

    return cartItem;
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};

// Function to remove a product from the cart
exports.removeFromCart = async (cartItemId) => {
  try {
    const cartItem = await CartItem.findByPk(cartItemId);
    if (!cartItem) {
      throw new ErrorHandler(404, 'Cart item not found');
    }

    await cartItem.destroy();
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};