const { HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const { TourBookingsService } = require('../../services');
const { catchAsync } = require('../../utils');

module.exports = {
  getTourBookings: catchAsync(async (req, res) => {
    const tourBookings = await TourBookingsService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tourBookings,
    });
  }),

  getTourBookingByUserId: catchAsync(async (req, res) => {
    const tourBooking = await TourBookingsService.getTourBookingsByUserId(req.params.userId);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tourBooking,
    });
  }),
};
