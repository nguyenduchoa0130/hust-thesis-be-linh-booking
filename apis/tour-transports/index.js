const router = require('express').Router();
const ctrl = require('./controller');
const { ValidationPayloadMiddleware } = require('../../middlewares');
const { createTransportSchema } = require('./validations');

router
  .route('/')
  .get(ctrl.getTransports)
  .post(ValidationPayloadMiddleware('body', createTransportSchema), ctrl.createTransports);

module.exports = router;
