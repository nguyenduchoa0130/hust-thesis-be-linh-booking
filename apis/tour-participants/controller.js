const { HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const { TourParticipantsService } = require('../../services');
const { catchAsync } = require('../../utils');

module.exports = {
  getParticipantsByTourBookingId: catchAsync(async (req, res) => {
    const participants = await TourParticipantsService.getAll({
      tourBooking: req.params.tourBookingId,
    });
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: participants,
    });
  }),
};
