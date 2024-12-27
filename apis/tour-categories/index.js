const router = require('express').Router();
const ctrl = require('./controller');
const { ValidationPayloadMiddleware, AuthGuard } = require('../../middlewares');
const { createTourCategorySchema, categoryIdSchema } = require('./validations');
const { RolesEnum } = require('../../enums');

router
  .route('/:id')
  .all(
    ValidationPayloadMiddleware('params', categoryIdSchema),
    AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]),
  )
  .get(ctrl.getTourCategoryById)
  .patch(ctrl.updateTourCategory)
  .delete(ctrl.removeTourCategory);

router
  .route('/')
  .get(ctrl.getTourCategories)
  .post(ValidationPayloadMiddleware('body', createTourCategorySchema), ctrl.createTourCategory);

module.exports = router;
