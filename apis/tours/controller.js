const { TourStatusEnum, HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const {
  ToursService,
  TourCategoriesService,
  TourDetailsService,
  TourDetailImagesService,
} = require('../../services');
const { catchAsync, fileUtil, errorsUtil } = require('../../utils');

module.exports = {
  // GET
  getTours: catchAsync(async (req, res) => {
    const filterQuery = { $and: [] };
    if (req.query.name) {
    }
    if (req.query.categories) {
    }
    if (req.query.destinations) {
    }
    const tours = await ToursService.getAll(req.body.query);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tours,
    });
  }),
  // GET
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
  // GET
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
  // POST
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
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data: newTour,
    });
  }),
  // PATCH
  updateTour: catchAsync(async (req, res) => {
    const tour = await ToursService.getOne({ _id: req.params.id });
    if (!tour) {
      throw errorsUtil.createNotFound(`Tour not found`);
    }
    const payload = {
      ...req.body,
    };
    const thumbnailFile = fileUtil.extract(req, 'thumbnail', true);
    if (thumbnailFile) {
      payload.thumbnailPath = thumbnailFile.path;
      payload.thumbnailUrl = fileUtil.constructUrl(req, thumbnailFile.filename);
    }
    await ToursService.update({ _id: req.params.id }, payload);
    const updatedTour = await ToursService.getOne({ _id: req.params.id });
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: updatedTour,
    });
  }),
  removeTour: catchAsync(async (req, res) => {
    const tour = await ToursService.getOne({ _id: req.params.id });
    if (!tour) {
      throw errorsUtil.createNotFound(`Tour not found`);
    }
    let promises = [];
    for (const detail of tour?.details) {
      const imageIds = detail?.images.map((img) => img?._id?.toString());
      promises.push(TourDetailImagesService.remove(imageIds));
      promises.push(TourDetailsService.remove({ _id: detail._id }));
    }
    promises.push(ToursService.remove({ _id: req.params.id }));
    return res.status(HttpStatusCodeEnum.NoContent).send();
  }),
};
