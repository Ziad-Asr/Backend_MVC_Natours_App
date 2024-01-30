const express = require('express');
const morgan = require('morgan');

const toursRouter = require('./routes/toursRoutes.js');
const usersRouter = require('./routes/usersroutes.js');

const app = express();

//______________________________________________________________________________________________________________________
// ## (Middlewares) ##

// Third-party middleware
app.use(morgan('dev')); // A middleware thet gives me info about the request

app.use(express.json()); // A middleware (Make data sent from the user {body} be available in the {req} paramater)

// Manual middleware
app.use((req, res, next) => {
  console.log('Hello, from the middleware!');
  next();
});

// Manual middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//______________________________________________________________________________________________________________________
// ## (Routes) ##

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);

//______________________________________________________________________________________________________________________
// ## (Starting server) ##

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

//______________________________________________________________________________________________________________________
