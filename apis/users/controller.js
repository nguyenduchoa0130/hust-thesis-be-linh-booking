const { HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const { UsersService } = require('../../services');
const { catchAsync, errorsUtil } = require('../../utils');

module.exports = {
  updateUser: catchAsync(async (req, res) => {
    const existingUser = await UsersService.getById(req.params.userId);
    if (!existingUser) {
      throw errorsUtil.createNotFound('User not found');
    }
    const payload = {
      ...req.body,
    };
    if (payload.phone) {
      const existingPhone = await UsersService.getOne({
        phone: payload.phone,
        _id: { $ne: req.params.userId },
      });
      if (existingPhone) {
        throw errorsUtil.createBadRequest('Phone was already used');
      }
    }
    await UsersService.update({ _id: req.params.userId }, payload);
    const updatedUser = await UsersService.getById(req.params.userId);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: updatedUser,
    });
  }),
};
