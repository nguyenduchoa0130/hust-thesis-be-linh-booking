const router = require('express').Router();
const { ValidationPayloadMiddleware } = require('../../middlewares');
const ctrl = require('./controller');
const { tourIdSchema } = require('./validations');

router
  .route('/tour/:id')
  .all(ValidationPayloadMiddleware('params', tourIdSchema))
  .get(ctrl.getTourSchedules);

router
  .route('/:id')
  .all(ValidationPayloadMiddleware('params', tourIdSchema))
  .get(ctrl.getScheduleById);

router.route('/').get(ctrl.getSchedules).post(ctrl.createSchedule);

module.exports = router;
