const router = require('express').Router();
const { ValidationPayloadMiddleware, AuthGuard } = require('../../middlewares');
const ctrl = require('./controller');
const { userIdSchema } = require('./validations');

router
  .route('/:userId')
  .all(ValidationPayloadMiddleware('params', userIdSchema), AuthGuard([], true))
  .patch(ctrl.updateUser);

module.exports = router;
