const { TourStatusEnum, HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const { ToursService } = require('../../services');
const { catchAsync, fileUtil, errorsUtil } = require('../../utils');

module.exports = {
  getTours: catchAsync(async (req, res) => {
    const tours = await ToursService.getAll(req.body.query);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tours,
    });
  }),
  getTourById: catchAsync(async (req, res) => {
    const tour = await ToursService.getOne({ _id: req.params.id });
    if (!tour) {
      throw errorsUtil.createNotFound(`Tour not found`);
    }
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tour,
    });
  }),
  getRelevantTours: catchAsync(async (req, res) => {
    const tour = await ToursService.getOne({ _id: req.params.id });
    if (!tour) {
      throw errorsUtil.createNotFound(`Tour not found`);
    }
    const relevantTours = await ToursService.getRelevantTours(req.params.id, tour?.category?._id);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: relevantTours,
    });
  }),
  createTour: catchAsync(async (req, res) => {
    const filterQuery = {
      name: new RegExp(req.body.name, 'i'),
    };
    const existingTour = await ToursService.getOne(filterQuery);
    if (existingTour) {
      throw errorsUtil.createBadRequest(`Tour with the same name already exists`);
    }
    const thumbnailFile = fileUtil.extract(req, 'thumbnail', true);
    const tourPayload = {
      ...req.body,
      status: TourStatusEnum.Active,
      thumbnailPath: thumbnailFile.path,
      thumbnailUrl: fileUtil.constructUrl(req, thumbnailFile.filename),
    };
    const newTour = await ToursService.create(tourPayload);
    console.log(newTour);
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data: newTour,
    });
  }),
  updateTour: catchAsync(async (req, res) => {}),
  removeTour: catchAsync(async (req, res) => {}),
};
