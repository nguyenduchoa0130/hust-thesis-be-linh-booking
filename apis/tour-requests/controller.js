const dayjs = require('dayjs');
const { HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const { TourRequestsService } = require('../../services');
const { catchAsync } = require('../../utils');

module.exports = {
  // GET
  getTourRequests: catchAsync(async (req, res) => {
    const filterQuery = {};
    if (req.query.status) {
      filterQuery.status = req.query.status;
    }
    const requests = await TourRequestsService.getAll(filterQuery);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: requests,
    });
  }),
  // GET
  getTourRequestById: catchAsync(async (req, res) => {
    const request = await TourRequestsService.getOne({ _id: req.params.requestId });
    if (!request) {
      throw errorsUtil.createNotFound(`Tour request not found`);
    }
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: request,
    });
  }),
  // POST
  createTourRequest: catchAsync(async (req, res) => {
    const payload = {
      ...req.body,
    };
    console.log(payload);
    if (req.body.dayCount) {
      payload.nightCount = +req.body.dayCount - 1;
    }
    if (req.body.dayCount && req.body.startAt) {
      payload.endAt = dayjs(req.body.startAt).add(+req.body.dayCount, 'days').toDate().toJSON();
    }
    const createdRequest = await TourRequestsService.create(payload);
    const reqWithFullIn4 = await TourRequestsService.getOne({ _id: createdRequest._id });
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data: reqWithFullIn4,
    });
  }),
};
