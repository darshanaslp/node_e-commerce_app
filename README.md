# E-Commerce Application

Task Backend Development for the e-commerce application
Details contain below with the instruction how to run the app


#  Backend E-Commerce Application

#  Node Back-end

## Project structure

	├── app  
		├──config			database configration
		├──controller		all contollers
		├──logs				error and run logs
		├──middleware		authmiddleware
		├──models			all models
		├──public
		├──routes			all routes
		├──service			all services
		├──util				validation,logger,error handling
	├── config
    ├── migration                
    ├── models           
    ├── seeders            
    ├── tests 
	├── postman collection 	
	├── .env
    ├── app.js                  
    └── package.json  
        


## Tech used

- Node Express
- sequelize
- axios


## How to run locally

Clone or download project go to the Back-end
Inside Backend open node console
Then type  `npm install`

### How to Migration and Seed

open console type `npm install sequelize -g`
now sequelize install globlally you able use sequelize commands

then in console `sequelize db:migrate` tabel are created in your database
and run `sequelize db:seed:all` now seeder gonna run and fill the table.

Run `npm start` if you have node installed locally.
App gonna be run `localhost:3000`


### Mysql credential

Inside app->config -> database.json edit this regarding to mqsal database information 
 
const dbHost = 'yourhost';
const dbPort = 'port';
const dbName = 'database';
const dbUser = 'username';
const dbPassword = 'password';

replace this information


## Rest api structure

## How to Import Postman api 

open postman app in you PC then in postman have tab called Import->drag file in PostmanCollection

### User api

Methods | Urls | Action	
--- | --- | ---
**POST** | `api/users/register` | User Register 
**POST** | `api/users/login` | User Login 
**GET** | `api/users/profile` | User Profile 
**PUT** | `api/users/profile` | Update Profile 
**DELETE** | `api/users/profile` | Delete Profile 
**GET** | `api/users/gdpr` | User GDPR 


### Shops api

Methods | Urls | Action	
--- | --- | ---
**GET** | `api/shops` |  List Shops
**POST** | `api/shops` |  Create Shops
**GET**| `api/shops/{shopId}` |  Single Shop
**PUT** | `api/shops/{shopId}` | Update Shop 
**DELETE** | `api/shops/{shopId}` | Delete Shop
**POST** | `shops/{shopId}/promotions` | Shop Promotion


### Shops api

Methods | Urls | Action	
--- | --- | ---
**GET** | `api/products` |  List Product
**POST** | `api/products` |  Create Product
**GET**| `api/products/{productId}` |  Single Product
**PUT** | `api/products/{productId}` | Update Product 
**DELETE** | `api/products/{productId}` | Delete Product

### Cart api

Methods | Urls | Action	
--- | --- | ---
**GET** | `api/products/cart` |  View Cart
**POST** | `api/products/{productId}/add-to-cart` |  Add to Cart
**GET**| `api/products/checkout` |  Checkout Product
