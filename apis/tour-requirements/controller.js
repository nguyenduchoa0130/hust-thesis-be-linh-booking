const dayjs = require('dayjs');
const { HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const { TourRequirementsService } = require('../../services');
const { catchAsync } = require('../../utils');

module.exports = {
  getTourRequirements: catchAsync(async (req, res) => {
    const filterQuery = {};
    if (req.query.status) {
      filterQuery.status = req.query.status;
    }
    const requirements = await TourRequirementsService.getAll(filterQuery);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: requirements,
    });
  }),
  createTourRequirement: catchAsync(async (req, res) => {
    const payload = {
      ...req.body,
    };
    if (req.body.dayCount) {
      payload.nightCount = +req.body.dayCount - 1;
    }
    if (req.body.dayCount && req.body.startAt) {
      payload.endAt = dayjs(req.body.startAt).add(+req.body.dayCount, 'days').toDate().toJSON();
    }
    const requirement = await TourRequirementsService.create(req.body);
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data: requirement,
    });
  }),
};
