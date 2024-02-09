const express = require('express');
const usersControllers = require('../controllers/usersControllers');
const authControllers = require('./../controllers/authControllers');

const router = express.Router();

router.post('/signup', authControllers.signup);

router
  .route('/')
  .get(usersControllers.getAllUsers)
  .post(usersControllers.createUser);

router
  .route('/:id')
  .get(usersControllers.getUser)
  .patch(usersControllers.updateUser)
  .delete(usersControllers.deleteUser);

module.exports = router;
