const Tour = require('./../models/tourModel');

exports.aliesTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingAverage,price';
  req.query.fields = 'name,price,summary,difficulty,ratingAverage';
  next();
};

exports.getAllTours = async (req, res) => {
  try {
    // ############
    // Filtering ##
    // ############
    const queryObj = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((field) => delete queryObj[field]); // foreach only does it'sfunctionality without returning any array

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g, // \b => exact match
      (match) => `$${match}`,
    ); // replace function returns an array of new values

    let query = Tour.find(JSON.parse(queryString));
    // (find) returns a promise(query object) which I can consume later but I only (saved this promise into query variable).

    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------

    // ##########
    // Sorting ##
    // ##########
    if (req.query.sort) {
      query = query.sort(req.query.sort.split(',').join(' '));
    } else {
      query = query.sort('-createdAt');
    }

    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------

    // ##################
    // Fields limiting ##
    // ##################
    if (req.query.fields) {
      query = query.select(req.query.fields.split(',').join(' '));
    } else {
      query = query.select('-__v');
    }

    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------

    // #############
    // Pagination ##
    // #############
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const toursNum = await Tour.countDocuments();
      if (skip >= toursNum) {
        throw new Error('This page is not exist'); // this redirect it to the catch block
      }
    }

    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------

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
