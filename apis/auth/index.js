const router = require('express').Router();
const ctrl = require('./controller');
const { ValidationPayloadMiddleware } = require('../../middlewares');
const { signUpSchema, signInSchema, refreshTokenSchema, sendResetPassword } = require('./validations');

router.post('/sign-in', ValidationPayloadMiddleware('body', signInSchema), ctrl.signIn);

router.post('/sign-up', ValidationPayloadMiddleware('body', signUpSchema), ctrl.signUp);
router.post('/send-reset-password', ValidationPayloadMiddleware('body', sendResetPassword), ctrl.handleForgotPassword);
router.post(
  '/refresh-token',
  ValidationPayloadMiddleware('body', refreshTokenSchema),
  ctrl.refreshToken,
);

module.exports = router;
