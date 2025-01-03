const { HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const { UsersService, RolesService } = require('../../services');
const { catchAsync, errorsUtil } = require('../../utils');

module.exports = {
  // GET
  getUsers: catchAsync(async (req, res) => {
    let filterQuery = {};
    if (req.query.role) {
      const role = await RolesService.getOne({ name: new RegExp(req.query.role, 'i') });
      if (role) {
        filterQuery.role = role._id.toString();
      }
    }
    const users = await UsersService.getAll(filterQuery);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: users,
    });
  }),
  // GET
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
  // POST
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
  // PATCH
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
  // DELETE
  deleteUser: catchAsync(async (req, res) => {
    const user = await UsersService.getById(req.params.userId);
    if (!user) {
      throw errorsUtil.createNotFound('User not found');
    }
    await UsersService.remove({ _id: req.params.userId });
    return res.status(HttpStatusCodeEnum.NoContent).json();
  }),
};
