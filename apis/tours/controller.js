const { TourStatusEnum, HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const {
  ToursService,
  TourCategoriesService,
  TourDetailsService,
  TourDetailImagesService,
  TourSchedulesService,
  TourRequestsService,
  TourTemplatesService,
} = require('../../services');
const { catchAsync, fileUtil, errorsUtil, logger } = require('../../utils');

module.exports = {
  // GET
  getTours: catchAsync(async (req, res) => {
    const filterQuery = { $and: [] };
    // Filter by name or introduction
    if (req.query.name) {
      filterQuery.$and.push({
        $or: [
          { name: { $regex: new RegExp(req.query.name, 'ig') } },
          { introduction: { $regex: new RegExp(req.query.name, 'ig') } },
        ],
      });
    }
    // Filter by categories
    if (req.query.categories?.length) {
      filterQuery.$and.push({
        category: { $in: req.query.categories },
      });
    }
    // Filter by template
    if (req.query.isTemplate === 'false') {
      filterQuery.$and.push({
        name: { $not: { $regex: new RegExp('template', 'i') } },
      });
    }
    // Filter by customer category
    if (req.query.isCustom === 'false') {
      const customCategory = await TourCategoriesService.getOne({
        name: new RegExp('custom', 'i'),
      });
      if (customCategory) {
        filterQuery.$and.push({
          category: { $ne: customCategory._id.toString() },
        });
      }
    }
    // Filter by schedules: Only take available schedules
    if (req.query.isStaff === 'false') {
      const availableSchedules = await TourSchedulesService.getDistinctSchedules({
        customer: null,
        startAt: { $gte: req.query.startDate ? new Date(req.query.startDate) : new Date() },
      });
      filterQuery.$and.push({
        _id: { $in: availableSchedules },
      });
    }
    // Delete filterQuery if empty
    if (!filterQuery.$and.length) {
      delete filterQuery.$and;
    }
    logger.info(`Tour Filter Query: ${JSON.stringify(filterQuery)}`);
    // Get tours
    const tours = await ToursService.getAll(filterQuery);
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
    // Validations
    const filterQuery = {
      name: new RegExp(req.body.name, 'i'),
    };
    const existingTour = await ToursService.getOne(filterQuery);
    if (existingTour) {
      throw errorsUtil.createBadRequest(`Tour with the same name already exists`);
    }
    // Construct payload
    const { tourRequest, ...restInfo } = req.body;
    const thumbnailFile = fileUtil.extract(req, 'thumbnail', true);
    const tourPayload = {
      ...restInfo,
      status: TourStatusEnum.Active,
      thumbnailPath: thumbnailFile ? thumbnailFile.path : null,
      thumbnailUrl: thumbnailFile ? fileUtil.constructUrl(req, thumbnailFile.filename) : null,
    };
    // Create new tour
    const newTour = await ToursService.create(tourPayload);
    const tourWithFullIn4 = await ToursService.getOne({ _id: newTour._id.toString() });
    // Check custom tour
    if (tourRequest) {
      await TourRequestsService.update(
        { _id: tourRequest },
        { tourId: tourWithFullIn4._id.toString(), updatedAt: new Date().toJSON() },
      );
    }
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data: tourWithFullIn4,
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
  // DELETE
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
    promises.push(TourSchedulesService.remove({ tour: req.params.id }));
    promises.push(TourTemplatesService.remove({ tour: req.params.id }));
    await Promise.all(promises);
    return res.status(HttpStatusCodeEnum.NoContent).send();
  }),
};
