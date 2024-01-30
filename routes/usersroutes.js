const express = require('express');

const usersControllers = require('./../controllers/usersControllers');

const router = express.Router();

router.param('id', (req, res, next, val) => {
  console.log(`param id is ${val}`);
  next();
});

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
