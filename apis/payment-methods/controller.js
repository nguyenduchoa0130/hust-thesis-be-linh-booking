const { HttpStatusCodeEnum, HttpStatusEnum } = require('../../enums');
const { PaymentMethodsService } = require('../../services');
const { catchAsync } = require('../../utils');

module.exports = {
  getPaymentMethods: catchAsync(async (req, res) => {
    const methods = await PaymentMethodsService.getAll();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: methods,
    });
  }),
};
