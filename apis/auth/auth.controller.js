const { HttpStatusEnum, HttpStatusCodeEnum } = require('../../enums');
const { UsersService } = require('../../services');
const { catchAsync, jwtUtil, errorsUtil, passwordUtil } = require('../../utils');

module.exports = {
  login: catchAsync(async (req, res) => {
    const user = await UsersService.getOne({ email: req.body.email });
    if (!user) {
      throw errorsUtil.createNotFound(`The email or password is incorrect`);
    }
    const isMatch = await passwordUtil.isMatch(user.password, req.body.password);
    if (!isMatch) {
      throw errorsUtil.createNotFound(`The email or password is incorrect`);
    }
    return res.status(200).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: user,
    });
  }),
  register: catchAsync(async (req, res) => {
    const [existingEmail, existingPhone] = await Promise.all([
      UsersService.getOne({ email: new RegExp(req.body.email, 'i') }),
      UsersService.getOne({ phone: req.body.phone }),
    ]);
    if (existingEmail) {
      throw errorsUtil.createBadRequest('Email was already used');
    }
    if (existingPhone) {
      throw errorsUtil.createBadRequest('Phone was already used');
    }
    const hashedPassword = await passwordUtil.hash(req.body.password);
    const newUser = await UsersService.create({ ...req.body, password: hashedPassword });
    const userFullIn4 = await UsersService.getById(newUser.id);
    return res.status(201).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data: userFullIn4,
    });
  }),
};
