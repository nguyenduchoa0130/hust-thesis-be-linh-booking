const ctrl = require('./controller');
const router = require('express').Router();
const { RolesEnum } = require('../../enums');
const { createUserSchema, userIdSchema } = require('./validations');
const { AuthGuard, ValidationPayloadMiddleware } = require('../../middlewares');

router
  .route('/users/:userId')
  .all(ValidationPayloadMiddleware('params', userIdSchema))
  .get(AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]), ctrl.getUserById)
  .patch(AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]), ctrl.updateUser)
  .delete(AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]), ctrl.deleteUser);

router
  .route('/users')
  .get(AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]), ctrl.getUsers)
  .post(
    AuthGuard([RolesEnum.Administrator]),
    ValidationPayloadMiddleware('body', createUserSchema),
    ctrl.createUser,
  );

router.route('/roles').get(ctrl.getRoles);

module.exports = router;
