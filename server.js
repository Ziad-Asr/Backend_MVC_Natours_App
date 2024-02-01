const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // Should be written before importing {{app}}

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWRD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log(`DB connection is successfully established`);
  });

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

const Tour = mongoose.model('Tour', toursSchema); // Tours collcetion (contaion documents(rows of data))

const testTour = new Tour({
  name: 'The park camper',
  price: 997,
});

testTour //Saving the document into the database
  .save()
  .then((doc) => {
    // This save returns a promise which I can consume
    console.log(doc);
  })
  .catch((err) => {
    console.log(`Error: ${err}`);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
