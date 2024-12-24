const { HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const { TourSchedulesService } = require('../../services');
const { catchAsync, errorsUtil } = require('../../utils');

module.exports = {
  getSchedules: catchAsync(async (req, res) => {
    const tourSchedules = await TourSchedulesService.getAll(req.query);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tourSchedules,
    });
  }),
  getTourSchedules: catchAsync(async (req, res) => {
    const tourSchedules = await TourSchedulesService.getAll({ tour: req.params.id });
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tourSchedules,
    });
  }),
  createSchedule: catchAsync(async (req, res) => {
    const newTourSchedule = await TourSchedulesService.create(req.body);
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Created,
      data: newTourSchedule,
    });
  }),
};
