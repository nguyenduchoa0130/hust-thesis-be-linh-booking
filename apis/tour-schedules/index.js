const router = require('express').Router();
const { ValidationPayloadMiddleware } = require('../../middlewares');
const ctrl = require('./controller');
const { tourIdSchema } = require('./validations');

router
  .route('/tour/:id')
  .get(ValidationPayloadMiddleware('params', tourIdSchema), ctrl.getTourSchedules);

router.route('/').get(ctrl.getSchedules).post(ctrl.createSchedule);

module.exports = router;
