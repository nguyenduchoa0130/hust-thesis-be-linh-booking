const router = require('express').Router();
const ctrl = require('./tour-categories.controller');
const { ValidationPayloadMiddleware } = require('../../middlewares');
const { createTourCategorySchema } = require('./tour-categories.validations');

router
  .route('/')
  .get(ctrl.getTourCategories)
  .post(ValidationPayloadMiddleware('body', createTourCategorySchema), ctrl.createTourCategory);

module.exports = router;
