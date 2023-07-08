const Product = require('../models/product');
const Warehouse = require('../models/warehouse');
const State = require('../models/state');
const { Customer, Order, Stock } = require('../models/Customer_Order_Stock');

// Logout Funtion 
module.exports.login = (req, res) => {
    return  res.render('login');
};

module.exports.signUp = (req, res) => {
    res.render('signup');
  };


  module.exports.dashBoard =  (req, res) => {
    try {
      const email = req.user.email;
      const businessName = req.user.businessName;
  
      res.render('dashboard', { email, businessName }); // Pass the data to the dashboard EJS file
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch data' });
    }
  };

module.exports.Order =  async (req, res) => {
    try {
      const customer = await Customer.find();
      const order = await Order.find();
      res.render('orders', {customer, order});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  
  module.exports.Stock = async (req, res) => {
    try {
       const  stock = await Stock.find();
      res.render('stock', {stock});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
module.exports.State = async (req, res) => {
    try {
       const  state = await State.find();
      res.render('state', {state});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  module.exports.Warehouse = async (req, res) => {
    try {
      const warehouse = await Warehouse.find(); // Retrieve all products from the database
  
      res.render('warehouse', {warehouse});
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
 module.exports.Product = async (req, res) => {
    try {
      const products = await Product.find(); // Retrieve all products from the database
  
      res.render('products', {products });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

