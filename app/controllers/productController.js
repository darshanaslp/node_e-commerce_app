const Product = require('../models/productModel');
const Shop = require('../models/productModel');
const User = require('../models/productModel');
const Cart = require('../models/productModel');
const CartItem = require('../models/productModel');
const { sequelize } = require('../config/database'); // Import your database connection

// Get a list of products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new product (for shop admins)
exports.createProduct = async (req, res) => {
  if (req.userRole !== 'shopAdmin') {
    return res.status(403).json({ error: 'Access Denied' });
  }

  try {
    const { name, description, price, stock } = req.body;
    // const shopId = req.params.shopId;

    const product = await Product.create({ name, description, price, stock});

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get details of a specific product
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update product details (for shop admins)
exports.updateProduct = async (req, res) => {
  if (req.userRole !== 'shopAdmin') {
    return res.status(403).json({ error: 'Access Denied' });
  }

  try {
    const productId = req.params.productId;
    const { name, description, price, stock } = req.body;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.stock = stock;
    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a product (for shop admins)
exports.deleteProduct = async (req, res) => {
  if (req.userRole !== 'shopAdmin') {
    return res.status(403).json({ error: 'Access Denied' });
  }

  try {
    const productId = req.params.productId;
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.destroy();

    res.json({ message: 'Product deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Add a product to the cart (for customers)
exports.addToCart = async (req, res) => {
  if (req.userRole !== 'customer') {
    return res.status(403).json({ error: 'Access Denied' });
  }

  try {
    const userId = req.user.id;
    const productId = req.params.productId;

    // Check if the product is in stock
    const product = await Product.findByPk(productId);
    if (!product || product.stockQuantity === 0) {
      return res.status(400).json({ error: 'Product not available' });
    }

    // Check if the user has an existing cart
    let cart = await Cart.findOne({ where: { UserId: userId } });

    if (!cart) {
      cart = await Cart.create({ UserId: userId });
    }

    // Add the product to the cart
    const cartItem = await CartItem.create({ ProductId: productId, CartId: cart.id });

    // Decrease the product's stock quantity
    await product.update({ stockQuantity: product.stockQuantity - 1 });

    res.status(201).json(cartItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// View the cart (for customers)
exports.viewCart = async (req, res) => {
  if (req.userRole !== 'customer') {
    return res.status(403).json({ error: 'Access Denied' });
  }

  try {
    const userId = req.user.id;
    const cart = await Cart.findOne({
      where: { UserId: userId },
      include: [
        {
          model: CartItem,
          as: 'cartItems',
          include: {
            model: Product,
            as: 'product',
          },
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Checkout the cart and place an order (for customers)
exports.checkout = async (req, res) => {
  if (req.userRole !== 'customer') {
    return res.status(403).json({ error: 'Access Denied' });
  }

  try {
    const userId = req.user.id;

    // Find the user's cart and associated items
    const cart = await Cart.findOne({
      where: { UserId: userId },
      include: [
        {
          model: CartItem,
          as: 'cartItems',
          include: {
            model: Product,
            as: 'product',
          },
        },
      ],
    });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Implement order creation logic here

    // Clear the user's cart
    await CartItem.destroy({ where: { CartId: cart.id } });

    res.json({ message: 'Checkout successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
