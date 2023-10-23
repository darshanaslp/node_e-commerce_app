const  Promotion = require('../models/promotionModel');
const  Shop = require('../models/promotionModel');
const  User  = require('../models/promotionModel');

// Get a list of promotions for a shop
exports.getPromotions = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const promotions = await Promotion.findAll({
      where: { ShopId: shopId },
      include: [
        {
          model: Shop,
          as: 'shop',
        },
      ],
    });
    res.json(promotions);
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

// Update a promotion (for shop admins)
exports.updatePromotion = async (req, res) => {
  if (req.userRole !== 'shopAdmin') {
    return res.status(403).json({ error: 'Access Denied' });
  }

  try {
    const promotionId = req.params.promotionId;
    const { name, discountPercentage, description } = req.body;

    const promotion = await Promotion.findByPk(promotionId);
    if (!promotion) {
      return res.status(404).json({ error: 'Promotion not found' });
    }

    promotion.name = name;
    promotion.discountPercentage = discountPercentage;
    promotion.description = description;
    await promotion.save();

    res.json(promotion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Delete a promotion (for shop admins)
exports.deletePromotion = async (req, res) => {
  if (req.userRole !== 'shopAdmin') {
    return res.status(403).json({ error: 'Access Denied' });
  }

  try {
    const promotionId = req.params.promotionId;
    const promotion = await Promotion.findByPk(promotionId);
    if (!promotion) {
      return res.status(404).json({ error: 'Promotion not found' });
    }

    await promotion.destroy();

    res.json({ message: 'Promotion deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

