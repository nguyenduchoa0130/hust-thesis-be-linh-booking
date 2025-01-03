const ctrl = require('./controller');
const router = require('express').Router();

router.route('/roles').get(ctrl.getRoles);

module.exports = router;
