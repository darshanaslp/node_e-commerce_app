const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');
const authMiddleware = require('../middleware/authMiddleware');

// Get a list of shops
router.get('/', shopController.getShops);

// Create a new shop (for system admins)
router.post('/', authMiddleware, shopController.createShop);

// Get details of a specific shop
router.get('/:shopId', shopController.getShopById);

// Update shop details (for shop admins and system admins)
router.put('/:shopId', authMiddleware, shopController.updateShop);

// Delete a shop (for system admins)
router.delete('/:shopId', authMiddleware, shopController.deleteShop);


// Define routes for shop promotions and discounts
router.post('/:shopId/promotions', authMiddleware, shopController.createPromotion);


module.exports = router;