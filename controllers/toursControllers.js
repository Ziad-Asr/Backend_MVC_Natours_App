const Tour = require('./../models/tourModel');

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'fail',
      message: 'Should contain name and price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).send({
    status: 'Success', // This make it in (Jsend) format
    // results: tours.length,
    // requestedAt: req.requestTime,
    // data: {
    //   tours,
    // },
  });
};

exports.getTour = (req, res) => {
  // req.params => returns an object of all {{parameters}} in the URL
  // /:param? => ? makes it {optional}
  //
  // const tour = tours.find((tour) => tour.id === req.params.id * 1);
  // // 1) tour => [{...}, {...}, ...]
  // // 2) tour => undefined
  // res.status(200).send({
  //   status: 'Success', // This make it in (Jsend) format
  //   results: tours.length,
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = (req, res) => {
  res.status(201).send({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.updateTour = (req, res) => {
  res.status(200).send({
    status: 'Success', // This make it in (Jsend) format
    data: {
      tour: '<Tour was updates successfuly>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).send({
    status: 'Success', // This make it in (Jsend) format
    data: null,
  });
};
