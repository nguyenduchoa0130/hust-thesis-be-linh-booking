const router = require('express').Router();
const ctrl = require('./controller');

router.route('/users').get(ctrl.getAllUsers);
router.route('/roles').get(ctrl.getAllRoles);

module.exports = router;
