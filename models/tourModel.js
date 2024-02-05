const mongoose = require('mongoose');

// Database tours Collection schema
const toursSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    trim: true,
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'The tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'The tour must have a maxGroupSize'],
  },
  difficulty: {
    type: String,
    required: [true, 'The tour must have a difficulty'],
  },

  ratingAverage: {
    type: String,
    default: 4.5,
  },
  ratingQuantity: {
    type: String,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDicount: String,
  summary: {
    type: String,
    trim: true, //Remove all space from the sides of a string
    required: [true, 'A tour must have a summary'],
  },
  description: {
    type: String,
    trim: true, //Remove all space from the sides of a string
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have a imageCover'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDate: [Date],
});

// Creating a collection
const Tour = mongoose.model('Tour', toursSchema); // Tours collcetion (contaion documents(rows of data))

module.exports = Tour;
