const Shop = require('../models/shopModel');
const Promotion = require('../models/shopModel');
const Product = require('../models/shopModel');
const User = require('../models/shopModel');


// Get a list of shops
exports.getShops = async (req, res) => {
  try {
    const shops = await Shop.findAll({
      include: [
        {
          model: Promotion,
          as: 'promotions',
        },
        {
          model: Product,
          as: 'products',
        },
      ],
    });
    res.json(shops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a new shop (for system admins)
exports.createShop = async (req, res) => {
  if (req.userRole !== 'systemAdmin') {
    return res.status(403).json({ error: 'Access Denied' });
  }

  try {
    const { name, description, location } = req.body;

    const shop = await Shop.create({ name, description, location });

    res.status(201).json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get details of a specific shop
exports.getShopById = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const shop = await Shop.findByPk(shopId, {
      include: [
        {
          model: Promotion,
          as: 'promotions',
        },
        {
          model: Product,
          as: 'products',
        },
      ],
    });
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update shop details (for shop admins and system admins)
exports.updateShop = async (req, res) => {
  if (req.userRole !== 'shopAdmin' && req.userRole !== 'systemAdmin') {
    return res.status(403).json({ error: 'Access Denied' });
  }

  try {
    const shopId = req.params.shopId;
    const { name, description, location } = req.body;

    const shop = await Shop.findByPk(shopId);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    shop.name = name;
    shop.description = description;
    shop.location = location;
    await shop.save();

    res.json(shop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a shop (for system admins)
exports.deleteShop = async (req, res) => {
  if (req.userRole !== 'systemAdmin') {
    return res.status(403).json({ error: 'Access Denied' });
  }

  try {
    const shopId = req.params.shopId;
    const shop = await Shop.findByPk(shopId);
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    await shop.destroy();

    res.json({ message: 'Shop deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Create a promotion for a shop (for shop admins)
exports.createPromotion = async (req, res) => {
  if (req.userRole !== 'shopAdmin') {
    return res.status(403).json({ error: 'Access Denied' });
  }

  try {
    const { name, discountPercentage, description } = req.body;
    const shopId = req.params.shopId;

    const promotion = await Promotion.create({ name, discountPercentage, description, ShopId: shopId });

    res.status(201).json(promotion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
