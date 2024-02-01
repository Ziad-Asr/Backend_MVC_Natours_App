const mongoose = require('mongoose');

// Database tours Collection schema
const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: String,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// Creating a collection
const Tour = mongoose.model('Tour', toursSchema); // Tours collcetion (contaion documents(rows of data))

module.exports = Tour;
