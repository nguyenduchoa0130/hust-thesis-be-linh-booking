const router = require('express').Router();
const ctrl = require('./controller');
const { RolesEnum } = require('../../enums');
const { AuthGuard } = require('../../middlewares');

router
  .route('/')
  .all(AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]))
  .get(ctrl.getTourTemplates)
  .post(ctrl.createTourTemplate);

module.exports = router;
