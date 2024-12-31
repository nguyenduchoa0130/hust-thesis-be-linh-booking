const dayjs = require('dayjs');
const { catchAsync, sendMailUtil } = require('../../utils');
const { TourRequestsService } = require('../../services');
const { HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const { tourRequestsTemplates } = require('../../templates');

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
  // PATCH
  updateTourRequest: catchAsync(async (req, res) => {
    const tourRequest = await TourRequestsService.getOne({ _id: req.params.requestId });
    if (!tourRequest) {
      throw errorsUtil.createNotFound(`Tour request not found`);
    }
    // Construct payload
    const payload = {
      ...req.body,
      updatedAt: new Date().toJSON(),
    };
    // Update
    await TourRequestsService.update({ _id: req.params.requestId }, payload);
    const updatedTourRequest = await TourRequestsService.getOne({ _id: req.params.requestId });
    // Return response
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: updatedTourRequest,
    });
  }),
  // DELETE
  deleteTourRequest: catchAsync(async (req, res) => {
    const request = await TourRequestsService.getOne({ _id: req.params.requestId });
    if (!request) {
      throw errorsUtil.createNotFound(`Tour request not found`);
    }
    await TourRequestsService.remove({ _id: req.params.requestId });
    return res.status(HttpStatusCodeEnum.NoContent).send();
  }),
  // POST
  sendNotification: catchAsync(async (req, res) => {
    const { to, requestId } = req.body;
    const tourRequest = await TourRequestsService.getOne({ _id: requestId });
    if (!tourRequest) {
      throw errorsUtil.createNotFound(`Tour request not found`);
    }
    switch (to) {
      case 'customer': {
        const customerEmail = tourRequest.email;
        const subject = `[Linh Booking] Your tour request #${requestId.slice(-5)} Was Updated`;
        const mailTemplate = tourRequestsTemplates.generateTourRequestStatusEmail(tourRequest);
        await sendMailUtil(customerEmail, subject, mailTemplate);
        break;
      }
      case 'staff': {
        break;
      }
      default: {
        throw errorsUtil.createBadRequest(`Invalid notification type`);
      }
    }
    return res.status(204).send();
  }),
};
