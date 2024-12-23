const router = require('express').Router();
const { UploadFileMiddleware, ValidationPayloadMiddleware } = require('../../middlewares');
const ctrl = require('./controller');
const { tourSchema } = require('./validations');

router
  .route('/')
  .get(ctrl.getTours)
  .post(
    UploadFileMiddleware.fields([{ name: 'thumbnail', maxCount: 1 }]),
    ValidationPayloadMiddleware('body', tourSchema),
    ctrl.createTour,
  );

module.exports = router;
