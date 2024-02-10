const jwt = require('jsonwebtoken');

const User = require('../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  }); // We used (await) because {create} is async function, and returns a promise which should be awited

  // 1) Payload => Data I want to store inside the token
  // 2) Secret password of jwt
  // 3) Options I want in the token
  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) check if email & password are exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
    // Use ((return)) to leave the (((login))) function
    // use ((next)) to throw the error to the globalErrorHandeling function
  }

  // 2) check if user is exist & password is correct
  const user = await User.findOne({ email }).select('+password'); // This is now a the user document

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) if everything is ok, send token to the client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'Success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  next();
});
