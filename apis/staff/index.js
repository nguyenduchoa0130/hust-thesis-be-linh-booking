const router = require('express').Router();
const ctrl = require('./controller');

router.route('/users').get(ctrl.getUsers);
router.route('/roles').get(ctrl.getRoles);

module.exports = router;
