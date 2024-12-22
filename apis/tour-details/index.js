const router = require('express').Router();
const { UploadFileMiddleware, ValidationPayloadMiddleware } = require('../../middlewares');
const ctrl = require('./controller');
const { tourDetailSchema } = require('./validations');

router
  .route('/')
  .post(
    UploadFileMiddleware.fields([{ name: 'images', maxCount: 5 }]),
    ValidationPayloadMiddleware('bod', tourDetailSchema),
    ctrl.createTourDetail,
  );

module.exports = router;
