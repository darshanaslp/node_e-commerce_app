const  Product  = require('../models/productModel');
const { Op } = require('sequelize');
const { ValidationError } = require('sequelize');
const { ErrorHandler } = require('../util/errorHandling');

// Function to create a new product
exports.createProduct = async (productData) => {
  try {
    const product = await Product.create(productData);
    return product;
  } catch (error) {
    if (error instanceof ValidationError) {
      // Handle validation errors
      throw new ErrorHandler(400, 'Validation error', error.errors);
    } else {
      throw new ErrorHandler(500, 'Internal Server Error', error.message);
    }
  }
};

// Function to get a list of products
exports.getProducts = async () => {
  try {
    const products = await Product.findAll();
    return products;
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};

// Function to get a product by ID
exports.getProductById = async (productId) => {
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      throw new ErrorHandler(404, 'Product not found');
    }
    return product;
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};

// Function to update a product
exports.updateProduct = async (productId, productData) => {
  try {
    const [updatedRows] = await Product.update(productData, {
      where: { id: productId },
    });
    if (updatedRows === 0) {
      throw new ErrorHandler(404, 'Product not found');
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      // Handle validation errors
      throw new ErrorHandler(400, 'Validation error', error.errors);
    } else {
      throw new ErrorHandler(500, 'Internal Server Error', error.message);
    }
  }
};

// Function to delete a product
exports.deleteProduct = async (productId) => {
  try {
    const deletedRows = await Product.destroy({
      where: { id: productId },
    });
    if (deletedRows === 0) {
      throw new ErrorHandler(404, 'Product not found');
    }
  } catch (error) {
    throw new ErrorHandler(500, 'Internal Server Error', error.message);
  }
};