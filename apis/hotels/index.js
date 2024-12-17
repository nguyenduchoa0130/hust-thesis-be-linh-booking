const { UploadFileMiddleware, ValidationPayloadMiddleware } = require('../../middlewares');
const { hotelIdSchema } = require('./hotels.validations');
const router = require('express').Router();
const ctrl = require('./hotels.controller');

const MAXIMUM_FILE = 5;

router
  .route('/:id')
  .all(ValidationPayloadMiddleware('params', hotelIdSchema))
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
