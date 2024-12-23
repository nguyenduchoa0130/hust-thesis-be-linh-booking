const { HttpStatusEnum, HttpStatusCodeEnum } = require('../../enums');
const { UsersService, RolesService } = require('../../services');
const { catchAsync } = require('../../utils');

module.exports = {
  getAllUsers: catchAsync(async (req, res) => {
    const users = await UsersService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: users,
    });
  }),
  getAllRoles: catchAsync(async (req, res) => {
    const roles = await RolesService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: roles,
    });
  }),
};
