const router = require('express').Router();
const ctrl = require('./controller');

router.route('/').get(ctrl.getSchedules).post(ctrl.createSchedule);

module.exports = router;
