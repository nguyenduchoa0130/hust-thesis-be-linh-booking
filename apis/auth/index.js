const router = require('express').Router();
const ctrl = require('./auth.controller');
const { ValidationPayloadMiddleware } = require('../../middlewares');
const { signUpSchema, signInSchema } = require('./auth.validations');

router.post('/sign-in', ValidationPayloadMiddleware('body', signInSchema), ctrl.signIn);

router.post('/sign-up', ValidationPayloadMiddleware('body', signUpSchema), ctrl.signUp);

module.exports = router;
