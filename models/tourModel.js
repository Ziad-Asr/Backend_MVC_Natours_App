const mongoose = require('mongoose');
const slugify = require('slugify');

// Database tours Collection schema
const toursSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      trim: true,
      unique: true,
      maxlength: [40, 'A tour name must be <= 40 characters'],
      minlength: [10, 'A tour name must be >= 10 characters'],
    },
    slug: String,
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'ratingsAverage must be above 1.0'],
      max: [5, 'ratingsAverage must be below 5.0'],
    },
    ratingsQuantity: {
      type: String,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDicount: {
      type: String,
      validate: {
        validator: function (value) {
          // this costum validator only works with new documents (Can't work with update)
          return value < this.price;
        },
        message: 'priceDicount ({VALUE}) should be less than price',
      },
    },
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
    secretTour: {
      type: Boolean,
      default: false,
    },
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

// ######################
// Document Middleware ##
// ######################

// 1) {## pre ##} Runs (before) .save(), .create() methods (((((((only))))))) {not insertMany() for example}
toursSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// toursSchema.pre('save', function (next) {
//   console.log('Will save document');
//   next();
// });

// // 2) {## post ##} Runs (after) .save(), .create() methods
// // doc => the finished document
// toursSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// ###################
// Query Middleware ## => Will proccess the current query not the current document
// ###################
toursSchema.pre(/^find/, function (next) {
  // (/^/) => Anything that starts with the word "find"
  this.start = Date.now();
  this.find({ secretTour: { $ne: true } });
  next();
});

toursSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  // console.log(docs);
  next();
});

// #########################
// Aggregation Middleware ## => Will proccess on aggregation methods
// ########################
toursSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  // here I added another statge to the aggregate functions (like in the get tour stats function)

  // console.log(this.pipeline());
  next();
});

// Creating a collection
const Tour = mongoose.model('Tour', toursSchema); // Tours collcetion (contaion documents(rows of data))

module.exports = Tour;
