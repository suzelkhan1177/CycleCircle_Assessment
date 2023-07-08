const mongoose = require('mongoose');
const url = 'mongodb+srv://suzelkhan46:UfxtWnQpfJtuLCo4@cluster0.tgl5tdg.mongodb.net/?retryWrites=true&w=majority';
 const db = mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  module.exports = db;