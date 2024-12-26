const { HttpStatusEnum, HttpStatusCodeEnum } = require('../../enums');
const { UsersService, RolesService } = require('../../services');
const { catchAsync, passwordUtil, errorsUtil } = require('../../utils');

module.exports = {
  getUsers: catchAsync(async (req, res) => {
    const users = await UsersService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: users,
    });
  }),

  getUserById: catchAsync(async (req, res) => {
    const user = await UsersService.getById(req.params.userId);
    if (!user) {
      throw errorsUtil.createNotFound('User not found');
    }
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: user,
    });
  }),

  createUser: catchAsync(async (req, res) => {
    const [existingEmail, existingPhone] = await Promise.all([
      UsersService.getOne({ email: req.body.email }),
      UsersService.getOne({ phone: req.body.phone }),
    ]);
    if (existingEmail) {
      throw errorsUtil.createBadRequest('Email was already used');
    }
    if (existingPhone) {
      throw errorsUtil.createBadRequest('Phone was already used');
    }
    const hashedPassword = await passwordUtil.hash(req.body.password);
    const newUser = await UsersService.create({
      ...req.body,
      hashedPassword: hashedPassword,
    });
    const userWithIn4 = await UsersService.getById(newUser.id);
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Created,
      data: userWithIn4,
    });
  }),

  updateUser: catchAsync(async (req, res) => {
    const user = await UsersService.getById(req.params.userId);
    if (!user) {
      throw errorsUtil.createNotFound('User not found');
    }
    const existingPhone = await UsersService.getOne({
      phone: req.body.phone,
      _id: { $ne: req.params.userId },
    });
    if (existingPhone) {
      throw errorsUtil.createBadRequest('Phone was already used');
    }
    await UsersService.update({ _id: req.params.userId }, { ...req.body });
    const updatedUserWithIn4 = await UsersService.getById(req.params.userId);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: updatedUserWithIn4,
    });
  }),

  deleteUser: catchAsync(async (req, res) => {
    const user = await UsersService.getById(req.params.userId);
    if (!user) {
      throw errorsUtil.createNotFound('User not found');
    }
    await UsersService.remove({ _id: req.params.userId });
    return res.status(HttpStatusCodeEnum.NoContent).json();
  }),

  getRoles: catchAsync(async (req, res) => {
    const roles = await RolesService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: roles,
    });
  }),
};
