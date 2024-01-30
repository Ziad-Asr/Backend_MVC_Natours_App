const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); // A middleware (Make data sent from the user {body} be available in the {req} paramater)

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);
// Make it 1)sync (To be read once at the beginning) 2)Top-level code
// JSON.parse() => Converts json into JS object

const getAllTours = (req, res) => {
  res.status(200).send({
    status: 'Success', // This make it in (Jsend) format
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  // req.params => returns an object of all {{parameters}} in the URL
  // /:param? => ? makes it {optional}

  const tour = tours.find((tour) => tour.id === req.params.id * 1);
  // 1) tour => [{...}, {...}, ...]
  // 2) tour => undefined

  if (!tour) {
    // tour is undefined => !tour is true
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).send({
    status: 'Success', // This make it in (Jsend) format
    results: tours.length,
    data: {
      tour,
    },
  });
};

const createTour = (req, res) => {
  const newID = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newID }, req.body);
  tours.push(newTour);

  fs.writeFile(
    // Must be (async) here because it is inside a callback function (Event loop lecture)
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours), // Convert it into json before writing it
    (err) => {
      res.status(201).send({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(200).send({
    status: 'Success', // This make it in (Jsend) format
    data: {
      tour: '<Tour was updates successfuly>',
    },
  });
};

const deleteTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'invalid ID',
    });
  }

  res.status(204).send({
    status: 'Success', // This make it in (Jsend) format
    data: null,
  });
};

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// This is useful if i want to change anything n the route like version(v1) or endpoint(tour) or anything else
app.route('/api/v1/tours').get(getAllTours).post(createTour);
app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App is running on ${port}`);
});
