const router = require('express').Router();
const ctrl = require('./controller');

router.get('/', ctrl.getRoles);

module.exports = router;
