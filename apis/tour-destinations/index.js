const router = require('express').Router();
const ctrl = require('./controller');
const { RolesEnum } = require('../../enums');
const { ValidationPayloadMiddleware, AuthGuard } = require('../../middlewares');
const { tourDestinationSchema, tourDestinationIdSchema } = require('./validations');

router
  .route('/:id')
  .all(
    ValidationPayloadMiddleware('params', tourDestinationIdSchema),
    AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]),
  )
  .get(ctrl.getTourDestinationById)
  .patch(ValidationPayloadMiddleware('body', tourDestinationSchema), ctrl.updateTourDestination)
  .delete(ctrl.deleteTourDestination);

router
  .route('/')
  .get(ctrl.getTourDestinations)
  .post(
    ValidationPayloadMiddleware('body', ValidationPayloadMiddleware('body', tourDestinationSchema)),
    ctrl.createTourDestination,
  );

module.exports = router;
