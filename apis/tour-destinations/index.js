const router = require('express').Router();
const ctrl = require('./controller');
const { ValidationPayloadMiddleware } = require('../../middlewares');
const { createTourDestinationSchema } = require('./validations');

router
  .route('/')
  .get(ctrl.getTourDestinations)
  .post(
    ValidationPayloadMiddleware('body', createTourDestinationSchema),
    ctrl.createTourDestination,
  );

module.exports = router;
