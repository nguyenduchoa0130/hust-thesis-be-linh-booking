const { TourStatusEnum, HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const { ToursService } = require('../../services');
const { catchAsync, fileUtil } = require('../../utils');

module.exports = {
  getTours: catchAsync(async (req, res) => {
    const tours = await ToursService.getAll(req.body.query);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tours,
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
