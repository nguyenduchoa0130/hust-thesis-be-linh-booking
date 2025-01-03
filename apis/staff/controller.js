const { HttpStatusEnum, HttpStatusCodeEnum } = require('../../enums');
const { UsersService, RolesService } = require('../../services');
const { catchAsync, passwordUtil, errorsUtil } = require('../../utils');

module.exports = {
  // GET
  getRoles: catchAsync(async (req, res) => {
    const roles = await RolesService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: roles,
    });
  }),
};
