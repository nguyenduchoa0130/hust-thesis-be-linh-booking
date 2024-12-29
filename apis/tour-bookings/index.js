const router = require('express').Router();
const { RolesEnum } = require('../../enums');
const { AuthGuard, ValidationPayloadMiddleware } = require('../../middlewares');
const { userIdSchema } = require('../staff/validations');
const ctrl = require('./controller');
const { tourBookingIdSchema } = require('./validations');

router
  .route('/users/:userId')
  .all([AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator], true)])
  .get(ValidationPayloadMiddleware('params', userIdSchema), ctrl.getTourBookingByUserId);

router
  .route('/:tourBookingId')
  .all(ValidationPayloadMiddleware('params', tourBookingIdSchema))
  .get(ctrl.getTourBookingById);

router
  .route('/')
  .all(AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]))
  .get(ctrl.getTourBookings);

module.exports = router;
