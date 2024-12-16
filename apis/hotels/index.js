const { UploadFileMiddleware } = require('../../middlewares');
const router = require('express').Router();
const ctrl = require('./hotels.controller');

const MAXIMUM_FILE = 5;

router
  .route('/:id')
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
