const router = require('express').Router();
const ctrl = require('./roles.controller');

router.get('/', ctrl.getRoles);

module.exports = router;
