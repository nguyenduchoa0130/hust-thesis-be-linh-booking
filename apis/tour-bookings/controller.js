const { HttpStatusCodeEnum, HttpStatusEnum, TourBookingStatusEnum } = require('../../enums');
const { TourBookingsService, TourParticipantsService } = require('../../services');
const { tourBookingsTemplates } = require('../../templates');
const { catchAsync, sendMailUtil } = require('../../utils');

module.exports = {
  // GET
  getTourBookings: catchAsync(async (req, res) => {
    const tourBookings = await TourBookingsService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tourBookings,
    });
  }),
  // GET
  getTourBookingById: catchAsync(async (req, res) => {
    const tourBooking = await TourBookingsService.getOne({ _id: req.params.tourBookingId });
    if (!tourBooking) {
      throw errorsUtil.createNotFound('Tour booking not found');
    }
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tourBooking,
    });
  }),
  // GET
  getTourBookingByUserId: catchAsync(async (req, res) => {
    const tourBooking = await TourBookingsService.getTourBookingsByUserId(req.params.userId);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tourBooking,
    });
  }),
  // PATCH
  updateTourBooking: catchAsync(async (req, res) => {
    const tourBooking = await TourBookingsService.getOne({ _id: req.params.tourBookingId });
    if (!tourBooking) {
      throw errorsUtil.createNotFound('Tour booking not found');
    }
    const payload = {
      ...req.body,
      updatedAt: new Date().toJSON(),
    };
    const shortTourBookingId = req.params.tourBookingId.slice(-5);
    await TourBookingsService.update({ _id: req.params.tourBookingId }, payload);
    const updatedTourBooking = await TourBookingsService.getOne({ _id: req.params.tourBookingId });
    const participants = await TourParticipantsService.getAll({
      tourBooking: req.params.tourBookingId,
    });
    switch (req.body.status) {
      case TourBookingStatusEnum.Pending: {
        break;
      }
      case TourBookingStatusEnum.Confirmed:
      case TourBookingStatusEnum.Completed: {
        const customerEmail = tourBooking?.customer?.email;
        const subject = `[Linh Booking] Confirmation - Booking Tour #${shortTourBookingId}`;
        const mailTemplate = tourBookingsTemplates.generateConfirmed(
          updatedTourBooking,
          participants,
        );
        await sendMailUtil(customerEmail, subject, mailTemplate);
        break;
      }
      case TourBookingStatusEnum.Cancelled:
      case TourBookingStatusEnum.Cancelling: {
        const customerEmail = tourBooking?.customer?.email;
        const subject = `[Linh Booking] Cancelled - Booking Tour #${shortTourBookingId}`;
        const mailTemplate = tourBookingsTemplates.generateCancelled(
          updatedTourBooking,
          participants,
        );
        await sendMailUtil(customerEmail, subject, mailTemplate);
        break;
      }
    }
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: updatedTourBooking,
    });
  }),
  // DELETE
  deleteTourBooking: catchAsync(async (req, res) => {
    await TourBookingsService.delete({ _id: req.params.tourBookingId });
    return res.status(HttpStatusCodeEnum.NoContent).send();
  }),
  // GET
  getAssignments: catchAsync(async (req, res) => {
    const assignments = await TourBookingsService.getAssignments(req.params.tourGuideId);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: assignments,
    });
  }),
};
