const router = require('express').Router();
const ctrl = require('./controller');

router.route('/mo-mo-payment-callback').post(ctrl.handleMoMoPaymentCallback);

router.route('/mo-mo').post(ctrl.createPaymentWithMoMoWallet);

module.exports = router;