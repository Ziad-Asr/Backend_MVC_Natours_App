const express = require('express');
const fs = require('fs');

const router = express.Router();

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);
// Make it 1)sync (To be read once at the beginning) 2)Top-level code
// JSON.parse() => Converts json into JS object

const getAllTours = (req, res) => {
  res.status(200).send({
    status: 'Success', // This make it in (Jsend) format
    results: tours.length,
    requestedAt: req.requestTime,
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
    },
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

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
