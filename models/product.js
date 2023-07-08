const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     productName: String,
    sku: { type: String, unique: true },
    category: String,
    subCategory: String,
    imageLink: String
  });
  
  const Product = mongoose.model('Product', productSchema);
  module.exports = Product;