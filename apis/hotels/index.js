const {
  UploadFileMiddleware,
  ValidationPayloadMiddleware,
  AuthGuard,
} = require('../../middlewares');
const { hotelIdSchema } = require('./validations');
const router = require('express').Router();
const ctrl = require('./controller');
const { RolesEnum } = require('../../enums');

const MAXIMUM_FILE = 5;

router
  .route('/:id')
  .all(
    AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]),
    ValidationPayloadMiddleware('params', hotelIdSchema),
  )
  .get(ctrl.getHotelById)
  .patch(
    UploadFileMiddleware.fields([{ name: 'images', maxCount: MAXIMUM_FILE }]),
    ctrl.updateHotel,
  )
  .delete(ctrl.removeHotel);

router
  .route('/')
  .get(ctrl.getHotels)
  .post(
    UploadFileMiddleware.fields([{ name: 'images', maxCount: MAXIMUM_FILE }]),
    ctrl.createHotel,
  );

module.exports = router;
