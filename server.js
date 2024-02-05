const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config({ path: './config.env' }); // Should be written before importing {{app}}

const app = require('./app');

// Connecting to database
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWARD,
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB connection is successfully established`);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
