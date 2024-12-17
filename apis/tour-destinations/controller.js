const { HttpStatusEnum, HttpStatusCodeEnum } = require('../../enums');
const { TourDestinationsService } = require('../../services');
const { catchAsync, errorsUtil } = require('../../utils');

module.exports = {
  getTourDestinations: catchAsync(async (req, res) => {
    const data = await TourDestinationsService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data,
    });
  }),

  createTourDestination: catchAsync(async (req, res) => {
    const existingValue = await TourDestinationsService.getOne({
      name: new RegExp(req.body.name, 'i'),
    });
    if (existingValue) {
      throw errorsUtil.createBadRequest('Destination already exists');
    }
    const data = await TourDestinationsService.create(req.body);
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data,
    });
  }),
};
