const express = require('express');

const router = express.Router();

const getAllUsers = (req, res) => {
  res
    .status(501)
    .json({ status: 'Error', message: 'This route is not yet defined' });
};

const createUser = (req, res) => {
  res
    .status(501)
    .json({ status: 'Error', message: 'This route is not yet defined' });
};

const getUser = (req, res) => {
  res
    .status(501)
    .json({ status: 'Error', message: 'This route is not yet defined' });
};

const updateUser = (req, res) => {
  res
    .status(501)
    .json({ status: 'Error', message: 'This route is not yet defined' });
};

const deleteUser = (req, res) => {
  res
    .status(501)
    .json({ status: 'Error', message: 'This route is not yet defined' });
};

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
