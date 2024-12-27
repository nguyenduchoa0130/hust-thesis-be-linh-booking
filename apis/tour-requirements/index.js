const router = require('express').Router();
const ctrl = require('./controller');

router.route('/').get(ctrl.getTourRequirements).post(ctrl.createTourRequirement);

module.exports = router;
