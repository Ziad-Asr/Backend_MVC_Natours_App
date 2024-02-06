const mongoose = require('mongoose');

// Database tours Collection schema
const toursSchema = new mongoose.Schema(
  {
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

    ratingsAverage: {
      type: String,
      default: 4.5,
    },
    ratingsQuantity: {
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
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

toursSchema.virtual('durationWeeks').get(function () {
  // we use regular function not arrow to use (this) which points to the current docuemnt
  return this.duration / 7;
}); // durationWeeks will be only in the database when we get the duration (It will not be persistent in the database)

// Document Middleware => Runs (before) .save(), .create() methods
toursSchema.pre('save', function () {
  console.log(this);
});

// Creating a collection
const Tour = mongoose.model('Tour', toursSchema); // Tours collcetion (contaion documents(rows of data))

module.exports = Tour;
