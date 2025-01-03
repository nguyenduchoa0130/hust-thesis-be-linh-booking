const router = require('express').Router();
const ctrl = require('./controller');
const { RolesEnum } = require('../../enums');
const { userIdSchema, createUserSchema } = require('./validations');
const { ValidationPayloadMiddleware, AuthGuard } = require('../../middlewares');

router
  .route('/:userId')
  .all(
    ValidationPayloadMiddleware('params', userIdSchema),
    AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator], true),
  )
  .get(ctrl.getUserById)
  .patch(ctrl.updateUser)
  .delete(ctrl.deleteUser);

router
  .route('/')
  .get(AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]), ctrl.getUsers)
  .post(
    AuthGuard([RolesEnum.Administrator]),
    ValidationPayloadMiddleware('body', createUserSchema),
    ctrl.createUser,
  );

module.exports = router;
