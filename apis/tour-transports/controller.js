const { HttpStatusEnum, HttpStatusCodeEnum } = require('../../enums');
const { TourTransportsService } = require('../../services');
const { catchAsync, errorsUtil } = require('../../utils');

module.exports = {
  // GET
  getTransports: catchAsync(async (req, res) => {
    const data = await TourTransportsService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data,
    });
  }),
  // GET
  getTransportById: catchAsync(async (req, res) => {
    const data = await TourTransportsService.getById(req.params.id);
    if (!data) {
      throw errorsUtil.createNotFound('Transport not found');
    }
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data,
    });
  }),
  // POST
  createTransports: catchAsync(async (req, res) => {
    const existingValue = await TourTransportsService.getOne({
      name: new RegExp(req.body.name, 'i'),
    });
    if (existingValue) {
      throw errorsUtil.createBadRequest('Transport already exists');
    }
    const data = await TourTransportsService.create(req.body);
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data,
    });
  }),
  // PATCH
  updateTransport: catchAsync(async (req, res) => {
    const existingTransport = await TourTransportsService.getById(req.params.id);
    if (!existingTransport) {
      throw errorsUtil.createNotFound('Transport not found');
    }
    const existingValue = await TourTransportsService.getOne({
      _id: { $ne: req.params.id },
      name: new RegExp(req.body.name, 'i'),
    });
    if (existingValue) {
      throw errorsUtil.createBadRequest('Transport already exists');
    }
    await TourTransportsService.update({ _id: req.params.id }, req.body);
    const updatedTransport = await TourTransportsService.getById(req.params.id);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: updatedTransport,
    });
  }),
  // DELETE
  deleteTransport: catchAsync(async (req, res) => {
    const existingTransport = await TourTransportsService.getById(req.params.id);
    if (!existingTransport) {
      throw errorsUtil.createNotFound('Transport not found');
    }
    await TourTransportsService.remove({ _id: req.params.id });
    return res.status(HttpStatusCodeEnum.NoContent).send();
  }),
};
