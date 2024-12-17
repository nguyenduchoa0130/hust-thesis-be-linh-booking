const { HttpStatusEnum, HttpStatusCodeEnum } = require('../../enums');
const { TourCategoriesService } = require('../../services');
const { catchAsync, errorsUtil } = require('../../utils');

module.exports = {
  getTourCategories: catchAsync(async (req, res) => {
    const categories = await TourCategoriesService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: categories,
    });
  }),

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
};
