const mongoose = require('mongoose');


// Define the Customer schema
const customerSchema = new mongoose.Schema({
  name: String,
  location: String,
});

  
// Define the Order schema
const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
  },
  sku: String,
  quantity: Number,
  location: String,
  fulfilled: {
    type: Boolean,
    default: false,
  },
});

const stockSchema = new mongoose.Schema({
    sku: String,
    warehouseNumber: String,
    qty: Number,
  });
  
  // Create the Stock model
const Stock = mongoose.model('Stock', stockSchema);

// Create the Customer model
const Customer = mongoose.model('Customer', customerSchema);

// Create the Order model
const Order = mongoose.model('Order', orderSchema);

module.exports = { Customer, Order , Stock };
