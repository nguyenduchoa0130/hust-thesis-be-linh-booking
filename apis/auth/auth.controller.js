const { HttpStatusEnum, HttpStatusCodeEnum, RolesEnum } = require('../../enums');
const { UsersService, TokensService, RolesService } = require('../../services');
const { catchAsync, jwtUtil, errorsUtil, passwordUtil } = require('../../utils');

module.exports = {
  signIn: catchAsync(async (req, res) => {
    const user = await UsersService.getOne({ email: req.body.email });
    if (!user) {
      throw errorsUtil.createNotFound(`The email or password is incorrect`);
    }
    const isMatch = await passwordUtil.isMatch(user.password, req.body.password);
    if (!isMatch) {
      throw errorsUtil.createNotFound(`The email or password is incorrect`);
    }
    delete user.password;
    const jwtPayload = {
      userId: user._id,
      email: user.email,
      role: user.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      jwtUtil.createAccessToken(jwtPayload),
      jwtUtil.createRefreshToken(jwtPayload),
    ]);
    await TokensService.remove(user.email);
    await TokensService.create({ refreshToken, email: user.email });
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: user,
      accessToken,
    });
  }),
  signUp: catchAsync(async (req, res) => {
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
    const [hashedPassword, customerRole] = await Promise.all([
      passwordUtil.hash(req.body.password),
      RolesService.getOne({ name: RolesEnum.Customer }),
    ]);
    const newUser = await UsersService.create({
      ...req.body,
      role: customerRole._id,
      password: hashedPassword,
    });
    const userFullIn4 = await UsersService.getById(newUser.id);
    const jwtPayload = {
      userId: userFullIn4._id,
      email: userFullIn4.email,
      role: userFullIn4.role,
    };
    const [accessToken, refreshToken] = await Promise.all([
      jwtUtil.createAccessToken(jwtPayload),
      jwtUtil.createRefreshToken(jwtPayload),
    ]);
    await TokensService.create({ refreshToken, email: userFullIn4.email });
    return res.status(HttpStatusCodeEnum.Created).json({
      status: HttpStatusEnum.Created,
      statusCode: HttpStatusCodeEnum.Created,
      data: userFullIn4,
      accessToken,
    });
  }),
};
