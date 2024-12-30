const router = require('express').Router();
const ctrl = require('./controller');
const { tourIdSchema } = require('./validations');
const { ValidationPayloadMiddleware } = require('../../middlewares');

router
  .route('/tour/:id')
  .all(ValidationPayloadMiddleware('params', tourIdSchema))
  .get(ctrl.getScheduleByTourId);

router
  .route('/:id')
  .all(ValidationPayloadMiddleware('params', tourIdSchema))
  .get(ctrl.getScheduleById)
  .patch(ctrl.updateSchedule)
  .delete(ctrl.deleteSchedule);

router.route('/').get(ctrl.getSchedules).post(ctrl.createSchedule);

module.exports = router;
