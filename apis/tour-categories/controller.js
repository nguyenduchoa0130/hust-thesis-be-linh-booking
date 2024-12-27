const { HttpStatusEnum, HttpStatusCodeEnum } = require('../../enums');
const { TourCategoriesService } = require('../../services');
const { catchAsync, errorsUtil } = require('../../utils');

module.exports = {
  // GET
  getTourCategories: catchAsync(async (req, res) => {
    const categories = await TourCategoriesService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: categories,
    });
  }),
  // GET
  getTourCategoryById: catchAsync(async (req, res) => {
    const category = await TourCategoriesService.getById(req.params.id);
    if (!category) {
      throw errorsUtil.createNotFound('Tour category not found');
    }
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: category,
    });
  }),
  // POST
  createTourCategory: catchAsync(async (req, res) => {
    const existingCategory = await TourCategoriesService.getOne({
      name: new RegExp(req.body.name, 'i'),
    });
    if (existingCategory) {
      throw errorsUtil.createBadRequest('Tour category already exists');
    }
    const newCategory = await TourCategoriesService.create(req.body);
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data: newCategory,
    });
  }),
  // PATCH
  updateTourCategory: catchAsync(async (req, res) => {
    const category = await TourCategoriesService.getById(req.params.id);
    if (!category) {
      throw errorsUtil.createNotFound('Tour category not found');
    }
    const existingCategory = await TourCategoriesService.getOne({
      name: new RegExp(req.body.name, 'i'),
      _id: { $ne: req.params.id },
    });
    if (existingCategory) {
      throw errorsUtil.createBadRequest('Tour category already exists');
    }
    await TourCategoriesService.update({ _id: req.params.id }, req.body);
    const updatedCategory = await TourCategoriesService.getById(req.params.id);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: updatedCategory,
    });
  }),
  // DELETE
  removeTourCategory: catchAsync(async (req, res) => {
    const category = await TourCategoriesService.getById(req.params.id);
    if (!category) {
      throw errorsUtil.createNotFound('Tour category not found');
    }
    await TourCategoriesService.remove({ _id: req.params.id });
    return res.status(HttpStatusCodeEnum.NoContent).send();
  }),
};
