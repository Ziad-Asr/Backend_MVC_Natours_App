const express = require('express');

const toursControllers = require('./../controllers/toursControllers');
const authControllers = require('./../controllers/authController');

const router = express.Router();

// router.param('id', toursControllers.checkID);

router
  .route('/top-5-cheap')
  .get(toursControllers.aliesTopTours, toursControllers.getAllTours);

router.route('/tour-stats').get(toursControllers.getTourStats);

router.route('/monthly-plan/:year').get(toursControllers.getMonthlyPlan);

router
  .route('/')
  .get(authControllers.protect, toursControllers.getAllTours)
  .post(toursControllers.createTour);

router
  .route('/:id')
  .get(toursControllers.getTour)
  .patch(toursControllers.updateTour)
  .delete(
    authControllers.protect,
    authControllers.restrictTo('admin', 'lead-guide'),
    toursControllers.deleteTour,
  );

module.exports = router;
