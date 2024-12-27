const router = require('express').Router();
const ctrl = require('./controller');
const { RolesEnum } = require('../../enums');
const { tourCategorySchema, categoryIdSchema } = require('./validations');
const { ValidationPayloadMiddleware, AuthGuard } = require('../../middlewares');

router
  .route('/:id')
  .all(
    ValidationPayloadMiddleware('params', categoryIdSchema),
    AuthGuard([RolesEnum.Administrator, RolesEnum.Coordinator]),
  )
  .get(ctrl.getTourCategoryById)
  .patch(ValidationPayloadMiddleware('body', tourCategorySchema), ctrl.updateTourCategory)
  .delete(ctrl.removeTourCategory);

router
  .route('/')
  .get(ctrl.getTourCategories)
  .post(ValidationPayloadMiddleware('body', tourCategorySchema), ctrl.createTourCategory);

module.exports = router;
