const  Promotion  = require('../models/promotionModel');
const { ErrorHandler } = require('../util/errorHandling');

// Function to create a new promotion
exports.createPromotion = async (promotionData) => {
  try {
    const promotion = await Promotion.create(promotionData);
    return promotion;
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};

// Function to get a list of promotions
exports.getPromotions = async () => {
  try {
    const promotions = await Promotion.findAll();
    return promotions;
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};