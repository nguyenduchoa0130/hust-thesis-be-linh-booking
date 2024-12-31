const router = require('express').Router();
const { RolesEnum } = require('../../enums');
const {
  UploadFileMiddleware,
  ValidationPayloadMiddleware,
  AuthGuard,
} = require('../../middlewares');
const ctrl = require('./controller');
const { tourDetailSchema, tourDetailIdSchema } = require('./validations');

router
  .route('/:tourDetailId')
  .all(
    ValidationPayloadMiddleware('params', tourDetailIdSchema),
    AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]),
  )
  .get(ctrl.getTourDetailById)
  .patch(UploadFileMiddleware.fields([{ name: 'images', maxCount: 5 }]), ctrl.updateTourDetail)
  .delete(ctrl.deleteTourDetail);

router
  .route('/')
  .post(
    UploadFileMiddleware.fields([{ name: 'images', maxCount: 5 }]),
    ValidationPayloadMiddleware('bod', tourDetailSchema),
    ctrl.createTourDetail,
  );

module.exports = router;
