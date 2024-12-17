const router = require('express').Router();
const ctrl = require('./controller');
const { ValidationPayloadMiddleware } = require('../../middlewares');
const { createTourCategorySchema } = require('./validations');

router
  .route('/')
  .get(ctrl.getTourCategories)
  .post(ValidationPayloadMiddleware('body', createTourCategorySchema), ctrl.createTourCategory);

module.exports = router;
