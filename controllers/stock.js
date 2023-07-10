
const Product = require('../models/product');
const Warehouse = require('../models/warehouse');
const { Stock } = require('../models/Customer_Order_Stock');

module.exports.getStock = async (req, res) => {
  try {
    const stock = await Stock.find();
    res.json(stock);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};




// Add stock route
module.exports.stock = async (req, res) => {
  try {
    const { sku, warehouseNumber, qty } = req.body;

    // Check if the product SKU exists
    const product = await Product.findOne({ sku });
    if (!product) {
      return res.status(404).json({ error: 'Product SKU not found' });
    }

    // Check if the warehouse exists
    const warehouse = await Warehouse.findOne({ warehouseNumber });
    if (!warehouse) {
      return res.status(404).json({ error: 'Warehouse not found' });
    }

    // Calculate the stock limit for the warehouse
    const stockLimit = warehouse.stockLimit;

    // Calculate the available stock in the warehouse
    const currentStock = warehouse.currentStock;

    // Calculate the new stock after adding the quantity
    const newStock = currentStock + qty;

    // Check if the new stock exceeds the stock limit
    if (newStock > stockLimit) {
      // Ship enough products to fulfill the stock limit
      const additionalQty = stockLimit - currentStock;
      if (additionalQty <= 0) {
        return res.status(400).json({ error: 'Stock limit exceeded' });
      }

      // Create a stock record for the additional products
      const stock = new Stock({
        sku,
        warehouseNumber,
        qty: additionalQty,
      });

      await stock.save();

      // Update the warehouse stock
      warehouse.currentStock = stockLimit;
      await warehouse.save();

      res.redirect('add-stock');
      // res.status(200).json({
      //   message: 'Stock added successfully (Stock limit fulfilled with warning)',
      //   additionalQty,
      // });
    } else {
      // Create a stock record for the requested products
      const stock = new Stock({
        sku,
        warehouseNumber,
        qty,
      });

      await stock.save();

      // Update the warehouse stock
      warehouse.currentStock = newStock;
      await warehouse.save();

      res.status(200).json({ message: 'Stock added successfully' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred' });
  }
};
