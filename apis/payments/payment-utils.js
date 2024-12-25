const crypto = require('crypto');
const { logger } = require('../../utils');

module.exports = {
  createMoMoRequestBody: (paymentMethod, paymentInfo) => {
    const accessKey = paymentMethod.accessKey;
    const secretKey = paymentMethod.secretKey;
    const orderInfo = `Book Tour: ${paymentInfo.tourName}`;
    const partnerCode = paymentMethod.partnerCode;
    const redirectUrl = paymentInfo.redirectUrl;
    const ipnUrl = paymentInfo.ipnUrl;
    const requestType = 'payWithMethod';
    const amount = paymentInfo.price;
    const orderId = paymentInfo.orderId;
    const requestId = orderId;
    const extraData = '';
    const orderGroupId = '';
    const autoCapture = true;
    const lang = 'vi';
    const rawSignature =
      'accessKey=' +
      accessKey +
      '&amount=' +
      amount +
      '&extraData=' +
      extraData +
      '&ipnUrl=' +
      ipnUrl +
      '&orderId=' +
      orderId +
      '&orderInfo=' +
      orderInfo +
      '&partnerCode=' +
      partnerCode +
      '&redirectUrl=' +
      redirectUrl +
      '&requestId=' +
      requestId +
      '&requestType=' +
      requestType;
    const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');
    logger.info('--------------------RAW SIGNATURE----------------');
    logger.info(rawSignature);
    logger.info('--------------------SIGNATURE----------------');
    logger.info(signature);

    return {
      partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId,
      amount,
      orderId,
      orderInfo,
      redirectUrl,
      ipnUrl,
      lang,
      requestType,
      autoCapture,
      extraData,
      orderGroupId,
      signature,
    };
  },
};
