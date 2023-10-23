const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');

// Get a list of products
router.get('/', productController.getProducts);

// Create a new product (for shop admins)
router.post('/', authMiddleware, productController.createProduct);

// Get details of a specific product
router.get('/:productId', productController.getProductById);

// Update product details (for shop admins)
router.put('/:productId', authMiddleware, productController.updateProduct);

// Delete a product (for shop admins)
router.delete('/:productId', authMiddleware, productController.deleteProduct);

// Implement routes for adding products to a cart, viewing the cart, and processing orders
router.post('/:productId/add-to-cart', authMiddleware, productController.addToCart);
router.get('/cart', authMiddleware, productController.viewCart);
router.post('/checkout', authMiddleware, productController.checkout);

// Implement other product-related routes as needed

module.exports = router;