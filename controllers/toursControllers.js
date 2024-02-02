const Tour = require('./../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    //Filtering methods
    // (1)
    // console.log('req.query');
    // console.log(req.query);

    // (2)
    // const tours = await Tour.find()
    //   .where('duration')
    //   .equals(5)
    //   .whare('difficulty')
    //   .equals('easy');

    // (3)
    // const tours = await Tour.find({
    //   duration: 5,
    //   difficulty: 'easy',
    // });

    // (4)
    // const tours = await Tour.find(req.query);

    // (5)
    // const queryObj = { ...req.query };
    // const excludedFields = ['page', 'sort', 'limit', 'fields'];
    // excludedFields.forEach((field) => delete queryObj[field]);
    // const tours = await Tour.find(queryObj);

    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete queryObj[field]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    const query = Tour.find(JSON.parse(queryString));
    // (find) returns a promise(query object) which I can consume later but I only (saved this promise into query variable).
    const tours = await query;
    // (await) => consume the promise(query object), and then return (documents) that matches this query.

    res.status(200).send({
      status: 'Success', // This make it in (Jsend) format
      requestedAt: req.requestTime,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'fail',
      tour,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).send({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // returns the updated document
      runValidators: true, // Each time an update happens, all validators will run again
    });

    res.status(200).send({
      status: 'Success', // This make it in (Jsend) format
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id, req.body);

    res.status(204).send({
      status: 'Success', // This make it in (Jsend) format
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent',
    });
  }
};
