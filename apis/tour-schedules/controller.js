const { HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const { TourSchedulesService, UsersService, ToursService } = require('../../services');
const { tourScheduleTemplates } = require('../../templates');
const { catchAsync, errorsUtil, sendMailUtil } = require('../../utils');

module.exports = {
  // GET
  getSchedules: catchAsync(async (req, res) => {
    const tourSchedules = await TourSchedulesService.getAll(req.query);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tourSchedules,
    });
  }),
  // GET
  getScheduleById: catchAsync(async (req, res) => {
    const tourSchedule = await TourSchedulesService.getOne({ _id: req.params.id });
    if (!tourSchedule) {
      throw errorsUtil.createNotFound('Tour schedule not found');
    }
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tourSchedule,
    });
  }),
  // GET
  getScheduleByTourId: catchAsync(async (req, res) => {
    const tourSchedules = await TourSchedulesService.getAll({ tour: req.params.id });
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: tourSchedules,
    });
  }),
  // POST
  createSchedule: catchAsync(async (req, res) => {
    // Extract information and fetch data
    const { frontendUrl, ...schedulePayload } = req.body;
    const [user, tour] = await Promise.all([
      req.body.customer ? UsersService.getOne({ _id: req.body.customer }) : Promise.resolve(null),
      ToursService.getOne({ _id: req.body.tour }),
    ]);
    if (!tour) {
      throw errorsUtil.createNotFound('Tour not found');
    }
    // Create new schedule
    const newTourSchedule = await TourSchedulesService.create(schedulePayload);
    // Send notification to customer if exists
    if (user) {
      const baseSubject = '[Linh Booking] Complete booking tour';
      const subject = `${baseSubject} #${tour?._id.toString().slice(-5)} - ${tour?.name}`;
      const mailTemplate = tourScheduleTemplates.generateCompleteScheduleTemplate(
        frontendUrl,
        tour,
        newTourSchedule,
        user,
      );
      await sendMailUtil(user.email, subject, mailTemplate);
    }
    // Return response with new schedule information
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Created,
      data: newTourSchedule,
    });
  }),
  // PATCH
  updateSchedule: catchAsync(async (req, res) => {
    const tourSchedule = await TourSchedulesService.getOne({ _id: req.params.id });
    if (!tourSchedule) {
      throw errorsUtil.createNotFound('Tour schedule not found');
    }
    await TourSchedulesService.update({ _id: req.params.id }, req.body);
    const updatedTourSchedule = await TourSchedulesService.getOne({ _id: req.params.id });
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: updatedTourSchedule,
    });
  }),
  // DELETE
  deleteSchedule: catchAsync(async (req, res) => {
    const tourSchedule = await TourSchedulesService.getOne({ _id: req.params.id });
    if (!tourSchedule) {
      throw errorsUtil.createNotFound('Tour schedule not found');
    }
    await TourSchedulesService.remove({ _id: req.params.id });
    return res.status(HttpStatusCodeEnum.NoContent).send();
  }),
};
