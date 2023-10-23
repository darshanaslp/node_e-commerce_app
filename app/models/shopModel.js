const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Shop = sequelize.define('Shop', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Define an association to link Shop with Product
Shop.associate = (models) => {
  Shop.hasMany(models.Product, {
    as: 'products', // Alias for the association
  });
};

// Define an association to link Shop with Promotion
Shop.associate = (models) => {
  Shop.hasMany(models.Promotion, {
    as: 'promotions', // Alias for the association
  });
};


// Define an association to link Shop with User
Shop.associate = (models) => {
  Shop.belongsToMany(models.User, {
    as: 'shopAdmins',
    through: 'ShopAdmins', // This refers to the join table for the many-to-many relationship
  });
};

module.exports = Shop;