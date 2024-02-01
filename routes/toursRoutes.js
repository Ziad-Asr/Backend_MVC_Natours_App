const express = require('express');

const toursControllers = require('./../controllers/toursControllers');

const router = express.Router();

// router.param('id', toursControllers.checkID);

router
  .route('/')
  .get(toursControllers.getAllTours)
  .post(toursControllers.createTour);
router
  .route('/:id')
  .get(toursControllers.getTour)
  .patch(toursControllers.updateTour)
  .delete(toursControllers.deleteTour);

module.exports = router;
