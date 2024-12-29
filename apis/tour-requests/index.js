const router = require('express').Router();
const ctrl = require('./controller');
const { requestIdSchema } = require('./validations');
const { ValidationPayloadMiddleware } = require('../../middlewares');

router
  .route('/:requestId')
  .all(ValidationPayloadMiddleware('params', requestIdSchema))
  .get(ctrl.getTourRequestById)
  .patch(ctrl.updateTourRequest)
  .delete(ctrl.deleteTourRequest);

router.route('/').get(ctrl.getTourRequests).post(ctrl.createTourRequest);

module.exports = router;
