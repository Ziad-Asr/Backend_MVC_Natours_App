const express = require('express');

const toursControllers = require('./../controllers/toursControllers');

const router = express.Router();

// router.param('id', toursControllers.checkID);

router
  .route('/top-5-cheap')
  .get(toursControllers.aliesTopTours, toursControllers.getAllTours);

router.route('/tour-stats').get(toursControllers.getTourStats);

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
