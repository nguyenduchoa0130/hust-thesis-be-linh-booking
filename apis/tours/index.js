const router = require('express').Router();
const ctrl = require('./controller');
const { tourSchema, tourIdSchema } = require('./validations');
const { UploadFileMiddleware, ValidationPayloadMiddleware } = require('../../middlewares');

router.route('/:id').get(ValidationPayloadMiddleware('params', tourIdSchema), ctrl.getTourById);
router
  .route('/relevant-tours/:id')
  .get(ValidationPayloadMiddleware('params', tourIdSchema), ctrl.getRelevantTours);

router
  .route('/')
  .get(ctrl.getTours)
  .post(
    UploadFileMiddleware.fields([{ name: 'thumbnail', maxCount: 1 }]),
    ValidationPayloadMiddleware('body', tourSchema),
    ctrl.createTour,
  );

module.exports = router;
