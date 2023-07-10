const Warehouse = require('../models/warehouse');
const State = require('../models/state');


module.exports.getWarehouse = async (req, res) => {
  try {
    const warehouse = await Warehouse.find();
    res.json(warehouse);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.warehouse = async (req, res) => {
    const { warehouseName, state, stockLimit, longitude, latitude , currentStock} = req.body;
    
    
    if (!warehouseName || !state || !latitude || !longitude || !stockLimit || !currentStock) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    if (!isValidCoordinate(longitude) || !isValidCoordinate(latitude)) {
      return res.status(400).send('Invalid coordinates');
    }
  
    const upperCaseStateName = state.toUpperCase();
    const existingState = await State.findOne({ stateName: upperCaseStateName });
  
    if (!existingState) {
      return res.status(400).json({ message: 'Invalid state ||  Please add the state.' });
    }
  
    const num = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    const warehouseNumber = existingState.stateId + num;
  
    // Check if a warehouse with the same number already exists
    const existingWarehouseNumber = await Warehouse.findOne({ warehouseNumber });
  
    if (existingWarehouseNumber) {
      return res.status(400).json({ error: 'A warehouse with the same number already exists.' });
    }
  
    // Check if a warehouse exists within 30km of the new warehouse's location
    const existingWarehouse = await Warehouse.findOne({
      location: {
        $nearSphere: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 30000 // 30km in meters
        }
      }
    });
  
    if (existingWarehouse) {
      return res.status(400).json({ message: 'A warehouse already exists within 30km of the provided location.' });
    }
  
    // Create a new warehouse object
    const warehouse = new Warehouse({
      warehouseNumber,
      warehouseName,
      state, 
      location: {
        type: 'Point',
        coordinates: [longitude, latitude] // Note the order of coordinates: [longitude, latitude]
      },
      stockLimit,
      currentStock
    });
   
    try {
      // Save the warehouse to the database
      await warehouse.save();
  
      res.redirect('add-warehouse');
      // return res.status(201).json({ message: 'Warehouse added successfully.', warehouse });
    } catch (error) {
      console.error('Error adding warehouse:', error);
      return res.status(500).json({ message: 'An error occurred while adding the warehouse.' });
    }
  };

  function isValidCoordinate(coord) {
  
    return !isNaN(parseFloat(coord));
  }
  
  