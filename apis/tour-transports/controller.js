const { HttpStatusEnum, HttpStatusCodeEnum } = require('../../enums');
const { TourTransportsService } = require('../../services');
const { catchAsync, errorsUtil } = require('../../utils');

module.exports = {
  getTransports: catchAsync(async (req, res) => {
    const data = await TourTransportsService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data,
    });
  }),

  createTransports: catchAsync(async (req, res) => {
    const existingValue = await TourTransportsService.getOne({
      name: new RegExp(req.body.name, 'i'),
    });
    if (existingValue) {
      throw errorsUtil.createBadRequest('Transport already exists');
    }
    const data = await TourTransportsService.create(req.body);
    console.log(data);
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data,
    });
  }),
};
