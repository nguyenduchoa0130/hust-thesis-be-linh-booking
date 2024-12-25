const router = require('express').Router();
const ctrl = require('./controller');

router.route('/').get(ctrl.getPaymentMethods);

module.exports = router;
