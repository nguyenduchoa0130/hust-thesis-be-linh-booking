const { HttpStatusEnum, HttpStatusCodeEnum } = require('../../enums');
const { TourDestinationsService } = require('../../services');
const { catchAsync, errorsUtil } = require('../../utils');

module.exports = {
  // GET
  getTourDestinations: catchAsync(async (req, res) => {
    const data = await TourDestinationsService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data,
    });
  }),
  // GET
  getTourDestinationById: catchAsync(async (req, res) => {
    const data = await TourDestinationsService.getById(req.params.id);
    if (!data) {
      throw errorsUtil.createNotFound('Destination not found');
    }
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data,
    });
  }),
  // POST
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
  // PATCH
  updateTourDestination: catchAsync(async (req, res) => {
    const existingValue = await TourDestinationsService.getById(req.params.id);
    if (!existingValue) {
      throw errorsUtil.createNotFound('Destination not found');
    }
    const existingDestination = await TourDestinationsService.getOne({
      name: new RegExp(req.body.name, 'i'),
      _id: { $ne: req.params.id },
    });
    if (existingDestination) {
      throw errorsUtil.createBadRequest('Destination already exists');
    }
    await TourDestinationsService.update({ _id: req.params.id }, req.body);
    const updatedDestination = await TourDestinationsService.getById(req.params.id);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: updatedDestination,
    });
  }),
  // DELETE
  deleteTourDestination: catchAsync(async (req, res) => {
    const existingValue = await TourDestinationsService.getById(req.params.id);
    if (!existingValue) {
      throw errorsUtil.createNotFound('Destination not found');
    }
    await TourDestinationsService.remove({ _id: req.params.id });
    return res.status(HttpStatusCodeEnum.NoContent).send();
  }),
};
