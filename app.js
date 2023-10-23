const express = require('express');
const bodyParser = require('body-parser'); 
const sequelize = require('./app/config/database'); // Import your database connection
const { logger, morgan } = require('./app/util/logger');

const app = express();

// Configure body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan);


// Import your route files
const userRoutes = require('./app/routes/userRoutes');
const shopRoutes = require('./app/routes/shopRoutes');
const productRoutes = require('./app/routes/productRoutes');
const promotionRoutes = require('./app/routes/productRoutes');

// Use the routes
app.use('/api/users', userRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/products', productRoutes);
app.use('/api/promotions', promotionRoutes);

app.get('/', (req, res) => {
    logger.info('This is an info log message');
    logger.error('This is an error log message');
  
    res.send('Hello, World!');
  });

// Define and import your models
const Shop = require('./app/models/shopModel');
const Product = require('./app/models/productModel');
const Promotion = require('./app/models/promotionModel');
const User = require('./app/models/userModel');
const Cart = require('./app/models/cartModel');
const CartItem = require('./app/models/cartItemModel');
const Order = require('./app/models/orderModel');
const OrderItem = require('./app/models/orderItemModel');


// Shop and Promotion Relationship (One-to-Many)
Shop.hasMany(Promotion, { as: 'promotions' });
Promotion.belongsTo(Shop);

// Shop and Product Relationship (One-to-Many)
Shop.hasMany(Product, { as: 'products' });
Product.belongsTo(Shop);

// User and Shop Relationship (Many-to-Many)
const ShopAdmins = sequelize.define('ShopAdmins', {});

Shop.belongsToMany(User, { as: 'shopAdmins', through: ShopAdmins });
User.belongsToMany(Shop, { as: 'managedShops', through: ShopAdmins });

// User and Promotion Relationship (Many-to-Many)
const PromoManagers = sequelize.define('PromoManagers', {});

Promotion.belongsToMany(User, { as: 'promoManagers', through: PromoManagers });
User.belongsToMany(Promotion, { as: 'managedPromotions', through: PromoManagers });

// Sync your models with the database
sequelize.sync()
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

// Add the rest of your app setup, middleware, and routes as needed

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
