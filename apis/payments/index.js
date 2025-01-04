const router = require('express').Router();
const ctrl = require('./controller');

router.route('/mo-mo-payment-callback').post(ctrl.handleMoMoPaymentCallback);

router.route('/mo-mo').post(ctrl.createPaymentWithMoMoWallet);

router.route('/statistics').get(ctrl.getStatistics);

router.route('/repay/:paymentId').patch(ctrl.repayTourBooking);

router.route('/:paymentId').patch(ctrl.updatePayment);

router.route('/').get(ctrl.getPayments);

module.exports = router;
