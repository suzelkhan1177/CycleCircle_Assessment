const Product = require('../models/product');
const { Customer, Order } = require('../models/Customer_Order_Stock');


// Process order route
module.exports.order = async (req, res) => {
    try {
      const { customerId, sku, orderQty } = req.body;
  
      // Check if the customer exists
      const customer = await Customer.findById(customerId);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      
      const existingProduct = await Product.findOne({sku : sku });
  
      if (!existingProduct) {
        return res.status(400).json({ message: 'Invalid SKU. Product not found in the catalog.' });
      }
  
     
  
      // Create a new order
      const order = new Order({
        customerId,
        sku ,
        quantity: orderQty,
        location : customer.location
      });
  
      // // Save the order to the database
      await order.save();
      res.redirect('/add-orders')
      // res.status(200).json({ message: 'Order processed successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
  module.exports.getOrder = async (req, res) => {
    try {
      const order = await Order.find();
      res.json(order);
    } catch (err) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
  module.exports.getCustomers= async (req, res) => {
    try {
      const customers = await Customer.find();
  
      res.status(200).json({ customers });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  
  
  module.exports.customers= async (req, res) => {
    try {
      const {name, location } = req.body;
  
      // Create a new customer
      const customer = new Customer({
        name,
        location,
      });
  
      // Save the customer to the database
      await customer.save();
      res.redirect('/add-orders');
      // res.status(200).json({ message: 'Customer added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred' });
    }
  };
  