
const Product = require('../models/product');

module.exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports.products = async (req, res) => {
    const {productName, category, subCategory, imageLink} = req.body;
  
    console.log(productName);
  
    // Validate required parameters
    if (!productName || !category || !subCategory || !imageLink) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }
  
    const newProduct = new Product({
      productName,
      sku: generateUniqueSku(),
      category,
      subCategory,
      imageLink
    });
  
   await newProduct.save()
      .then(() => {
        // res.status(201).json({ message: 'Product added successfully', redirect: '/add-products' });
         res.redirect('/add-products');
      })
      .catch((error) => {
        res.status(500).json({ error: 'Failed to add the product' });
      });
  };
  
  
  
  function generateUniqueSku() {
    const uniqueString = Math.random().toString(36).substr(2, 8);
    return `/product/${uniqueString}`;
  }