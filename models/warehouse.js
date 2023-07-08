const mongoose = require('mongoose');

const warehouseSchema = new mongoose.Schema({
  warehouseNumber: { type: String, unique: true, required: true },
  warehouseName: { type: String, required: true },
  state: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  stockLimit: { type: Number, default: Infinity },
  currentStock: { type: Number, required: true },
});

warehouseSchema.index({ location: '2dsphere' }); // Create a geospatial index for location

module.exports = mongoose.model('Warehouse', warehouseSchema);
