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
    const request = await TourRequestsService.getOne({ _id: req.params.requestId });
    if (!request) {
      throw errorsUtil.createNotFound(`Tour request not found`);
    }
    const {
      isStartCreatingTour,
      isSendNotificationToStaff,
      isSendNotificationToCustomer,
      ...payload
    } = req.body;
    payload.updatedAt = new Date().toJSON();
    // Update
    await TourRequestsService.update({ _id: req.params.requestId }, payload);
    const updatedTourRequest = await TourRequestsService.getOne({ _id: req.params.requestId });
    const tourRequestId = updatedTourRequest._id.toString().slice(-5);
    // Create tour template
    if (isStartCreatingTour) {
    }
    // Send notification to customer and staff
    if (isSendNotificationToCustomer) {
      await sendMailUtil(
        updatedTourRequest.email,
        `[Tour Booking] - Notify - Tour Request #${tourRequestId} Was Updated By Staff`,
        tourRequestsTemplates.generateTourStatusRequestMailForCustomer(updatedTourRequest),
      );
    }
    if (isSendNotificationToStaff) {
      await sendMailUtil(
        process.env.SYSTEM_HOST_EMAIL,
        `[Tour Booking] - Notify - Tour Request #${tourRequestId} Was Updated By Customer`,
        tourRequestsTemplates.generateTourStatusRequestMailForStaff(updatedTourRequest),
      );
    }
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
};
