const State = require('../models/state');

module.exports.states = async (req, res) => {
    try {
      const { stateName } = req.body;
      const stateId = generateStateId(); // Function to generate a 2-character state ID
      const upperCaseStateName = stateName.toUpperCase();
  
      // Check if a state with the same name already exists
      const existingState = await State.findOne({ stateName: upperCaseStateName });
      if (existingState) {
        return res.status(409).json({ error: 'State already exists', stateId: existingState.stateId , stateName: existingState.stateName });
      }
  
      const state = new State({ stateId, stateName: upperCaseStateName });
      await state.save();
  
      res.redirect('/add-state');
      // res.status(200).json(state);
    } catch (error) {
      console.error('Error creating state:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  
function generateStateId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let stateId = '';
  for (let i = 0; i < 2; i++) {
    stateId += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return stateId;
}