const router = require('express').Router();
const ctrl = require('./controller');
const { tourSchema, tourIdSchema } = require('./validations');
const { UploadFileMiddleware, ValidationPayloadMiddleware } = require('../../middlewares');

router
  .route('/relevant-tours/:id')
  .all(ValidationPayloadMiddleware('params', tourIdSchema))
  .get(ctrl.getRelevantTours);

router
  .route('/:id')
  .all(ValidationPayloadMiddleware('params', tourIdSchema))
  .get(ctrl.getTourById)
  .patch(UploadFileMiddleware.fields([{ name: 'thumbnail', maxCount: 1 }]), ctrl.updateTour)
  .delete(ctrl.removeTour);

router
  .route('/')
  .get(ctrl.getTours)
  .post(
    UploadFileMiddleware.fields([{ name: 'thumbnail', maxCount: 1 }]),
    ValidationPayloadMiddleware('body', tourSchema),
    ctrl.createTour,
  );

module.exports = router;
