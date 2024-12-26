const router = require('express').Router();
const { RolesEnum } = require('../../enums');
const { AuthGuard, ValidationPayloadMiddleware } = require('../../middlewares');
const { userIdSchema } = require('../staff/validations');
const ctrl = require('./controller');

router
  .route('/users/:userId')
  .all([AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator], true)])
  .get(ValidationPayloadMiddleware('params', userIdSchema), ctrl.getTourBookingByUserId);

router
  .route('/')
  .all(AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]))
  .get(ctrl.getTourBookings);

module.exports = router;
