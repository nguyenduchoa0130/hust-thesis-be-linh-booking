const router = require('express').Router();
const ctrl = require('./controller');
const { tourBookingIdSchema } = require('./validations');
const { ValidationPayloadMiddleware } = require('../../middlewares');

router
  .route('/bookings/:tourBookingId')
  .all(ValidationPayloadMiddleware('params', tourBookingIdSchema))
  .get(ctrl.getParticipantsByTourBookingId);

module.exports = router;
