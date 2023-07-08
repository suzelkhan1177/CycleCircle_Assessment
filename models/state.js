const mongoose = require('mongoose');

const stateSchema = new mongoose.Schema({
    stateId: {
      type: String,
      required: true,
      unique: true,
      minlength: 2,
      maxlength: 2,
      auto: true,
    },
    stateName: {
      type: String,
      required: true,
    },
  });
  
  const State = mongoose.model('State', stateSchema);

  module.exports = State;
  