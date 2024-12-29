const { HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const { TourBookingsService } = require('../../services');
const { catchAsync } = require('../../utils');

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
};
