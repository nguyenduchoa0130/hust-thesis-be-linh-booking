const router = require('express').Router();
const ctrl = require('./controller');
const { tourTransportSchema, tourTransportIdSchema } = require('./validations');
const { ValidationPayloadMiddleware, AuthGuard } = require('../../middlewares');
const { RolesEnum } = require('../../enums');

router
  .route('/:id')
  .all(
    ValidationPayloadMiddleware('params', tourTransportIdSchema),
    AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]),
  )
  .get(ctrl.getTransportById)
  .patch(ValidationPayloadMiddleware('body', tourTransportSchema), ctrl.updateTransport)
  .delete(ctrl.deleteTransport);

router
  .route('/')
  .get(ctrl.getTransports)
  .post(ValidationPayloadMiddleware('body', tourTransportSchema), ctrl.createTransports);

module.exports = router;
