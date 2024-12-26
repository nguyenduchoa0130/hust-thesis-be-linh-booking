const router = require('express').Router();
const ctrl = require('./auth.controller');
const { ValidationPayloadMiddleware } = require('../../middlewares');
const { signUpSchema, signInSchema, refreshTokenSchema } = require('./auth.validations');

router.post('/sign-in', ValidationPayloadMiddleware('body', signInSchema), ctrl.signIn);

router.post('/sign-up', ValidationPayloadMiddleware('body', signUpSchema), ctrl.signUp);

router.post(
  '/refresh-token',
  ValidationPayloadMiddleware('body', refreshTokenSchema),
  ctrl.refreshToken,
);

module.exports = router;
