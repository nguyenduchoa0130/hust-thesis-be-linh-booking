const { HttpStatusEnum, HttpStatusCodeEnum } = require('../../enums');
const { RolesService } = require('../../services');
const { catchAsync } = require('../../utils');

module.exports = {
  getRoles: catchAsync(async (req, res) => {
    const roles = await RolesService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: roles,
    });
  }),
};
