const crypto = require('crypto');
const { HttpStatusEnum, HttpStatusCodeEnum, RolesEnum } = require('../../enums');
const { UsersService, TokensService, RolesService, ForgotPasswordService } = require('../../services');
const { catchAsync, jwtUtil, errorsUtil, passwordUtil, createTemplateEmail, sendMailUtil } = require('../../utils');
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
    let userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: userWithoutPassword,
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
  refreshToken: catchAsync(async (req, res) => {
    const token = await TokensService.getOne(req.body.email);
    if (!token) {
      throw errorsUtil.createNotFound('Your Token was expired.');
    }
    try {
      const decoded = jwtUtil.verifyToken(token.refreshToken);
      const newAccessToken = await jwtUtil.createAccessToken({
        userId: decoded._id,
        email: decoded.email,
        role: decoded.role,
      });
      return res.status(HttpStatusCodeEnum.Ok).json({
        status: HttpStatusEnum.Success,
        statusCode: HttpStatusCodeEnum.Ok,
        accessToken: newAccessToken,
      });
    } catch (error) {
      throw errorsUtil.createNotFound('Your Token was expired.');
    }
  }),

  handleForgotPassword: catchAsync(async (req, res) => {
    const { email } = req.body;
    const user = await UsersService.getOne({ email: email });
    // Find user by email
    if (!user) {
      throw errorsUtil.createNotFound("Can't not find any users with email '" + email + "'");
    }

    // Delete forgot password record if mode is update
    const deleteResult = await ForgotPasswordService.remove({ userId: user.id });
    // Generate a 6-character confirmation code
    const confirmationCode = crypto.randomBytes(3).toString('hex');

    // Set expiration time to 5 minutes from now
    const expiration = new Date(Date.now() + 5 * 60 * 1000);
    const forgetPasswordRecord = await ForgotPasswordService.create({
      userId: user.id,
      confirmationCode,
      expiration,
      email,
    });

    const mailTemplate = createTemplateEmail.createForgotPasswordMail(
      `${user.fullName}`,
      confirmationCode,
    );
    await sendMailUtil(user.email, `Booking Tour: Recovery Password`, mailTemplate);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: forgetPasswordRecord,
    });
  }),

  resetPassword: catchAsync(async (req, res) => {
    const { email, password, code } = req.body;

    // Delete forgot password record if mode is update
    const forgetPasswordRecord = await ForgotPasswordService.getOne({ email: email , confirmationCode: code});
    if (!forgetPasswordRecord) {
      throw errorsUtil.createNotFound("Wrong code for email'" + email + "'");
    }

    const user = await UsersService.getOne({ email: email });
    console.log(JSON.stringify(user));
    
    // Find user by email
    if (!user) {
      throw errorsUtil.createNotFound("Can't not find any users with email '" + email + "'");
    }
    const hashedPassword = await passwordUtil.hash(password);
    await UsersService.update({ _id: user._id }, { password: hashedPassword });

    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: 'Change password successfully',
    });
  }),
};
