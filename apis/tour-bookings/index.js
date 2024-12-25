const router = require('express').Router();
const ctrl = require('./controller');

router.route('/').get(ctrl.getTourBookings);

module.exports = router;
