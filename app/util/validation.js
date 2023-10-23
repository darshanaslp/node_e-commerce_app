const Joi = require('joi');

// Define validation schemas for different requests

// Example schema for validating user registration data
exports.validateUserRegistration = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};


// Example schema for validating user registration data
exports.validateUserProfileUpdate = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().email().required(),
  });

  return schema.validate(data);
};

// Example schema for validating user login data
exports.validateUserLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(data);
};

// Example schema for validating product creation data
exports.validateProductCreation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    description: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    stockQuantity: Joi.number().min(0).required(),
  });

  return schema.validate(data);
};

// Example schema for validating promotion creation data
exports.validatePromotionCreation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    discountPercentage: Joi.number().min(0).max(100).required(),
    description: Joi.string().min(3).required(),
  });

  return schema.validate(data);
};