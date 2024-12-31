const axios = require('axios');
const { catchAsync, errorsUtil, logger } = require('../../utils');
const {
  PaymentMethodsService,
  PaymentsService,
  TourBookingsService,
  TourParticipantsService,
} = require('../../services');
const { createMoMoRequestBody } = require('./payment-utils');
const {
  HttpStatusCodeEnum,
  HttpStatusEnum,
  PaymentStatusEnum,
  MoMoStatusCodeEnum,
} = require('../../enums');

module.exports = {
  getPayments: catchAsync(async (req, res) => {
    const filterQuery = req.query;
    const payments = await PaymentsService.getAll(filterQuery);
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: payments,
    });
  }),
  createPaymentWithMoMoWallet: catchAsync(async (req, res) => {
    const { tourBookingInfo, paymentInfo } = req.body;
    const paymentMethod = await PaymentMethodsService.getOne({ _id: paymentInfo.paymentMethod });
    if (!paymentMethod) {
      throw errorsUtil.createNotFound(
        `PaymentMethod not found. Can't continue tour booking process`,
      );
    }
    try {
      logger.info('--------------------PAYMENT REQUEST BODY----------------');
      const MO_MO_CALLBACK = '/apis/payments/mo-mo-payment-callback';
      const callbackUrl = `${req.protocol}s://${req.get('host')}${MO_MO_CALLBACK}`;
      const requestBody = createMoMoRequestBody(paymentMethod, paymentInfo, callbackUrl);
      logger.info(JSON.stringify(requestBody));

      logger.info('-------------------- PAYMENT CONFIGS ----------------');
      const configs = {
        method: 'POST',
        url: `https://${paymentMethod.host}${paymentMethod.path}`,
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSON.stringify(requestBody)),
        },
        data: JSON.stringify(requestBody),
      };
      logger.info(JSON.stringify(configs));

      logger.info('-------------------- PAYMENT RESPONSE ----------------');
      const { data } = await axios(configs);
      logger.info(JSON.stringify(data));
      // Create payment
      const paymentPayload = {
        paymentId: data.orderId,
        status: PaymentStatusEnum.Pending,
        amount: data.amount,
        paymentMethod: paymentInfo.paymentMethod,
        tourSchedule: tourBookingInfo.tourSchedule,
      };
      const createdPayment = await PaymentsService.create(paymentPayload);
      // Create tour booking
      const { tourParticipants, ...restTourBookingInfo } = tourBookingInfo;
      const tourBookingPayload = {
        ...restTourBookingInfo,
        payment: createdPayment._id,
      };
      const createdTourBooking = await TourBookingsService.create(tourBookingPayload);
      // Create participants
      const tourParticipantPayloads = tourParticipants.map((participant) => ({
        ...participant,
        tourBooking: createdTourBooking._id,
      }));
      await TourParticipantsService.create(tourParticipantPayloads);
      // Return results
      return res.status(HttpStatusCodeEnum.Ok).json({
        status: HttpStatusEnum.Success,
        statusCode: HttpStatusCodeEnum.Ok,
        data,
      });
    } catch (error) {
      const err = new Error(error?.data?.message || error.message);
      err.statusCode = error.status;
      logger.error(error);
      throw err;
    }
  }),
  handleMoMoPaymentCallback: catchAsync(async (req, res) => {
    const payment = await PaymentsService.getOne({ paymentId: req.body.orderId });
    if (!payment) {
      logger.error(`Can't find payment with id ${req.body.orderId}`);
      return res.status(HttpStatusCodeEnum.NoContent).send();
    }
    // Update payment and tour booking
    if (req.body.resultCode === MoMoStatusCodeEnum.Success) {
      await PaymentsService.update(
        { _id: payment._id },
        { status: PaymentStatusEnum.Paid, createdAt: new Date() },
      );
      return res.status(HttpStatusCodeEnum.Ok).send({
        status: HttpStatusEnum.Updated,
        statusCode: HttpStatusCodeEnum.Ok,
        message: 'Your payment have been updated',
      });
    } else {
      logger.error(`Error in completed payment: ${JSON.stringify(req.body)}`);
      return res.status(HttpStatusCodeEnum.NoContent).send();
    }
  }),
  updatePayment: catchAsync(async (req, res) => {
    const payload = {
      ...req.body,
      updatedAt: new Date().toJSON(),
    };
    const payment = await PaymentsService.getOne({ paymentId: req.params.paymentId });
    if (!payment) {
      throw errorsUtil.createNotFound(`Payment not found. Can't update status`);
    }
    await PaymentsService.update({ paymentId: req.params.paymentId }, payload);
    const updatedPayment = await PaymentsService.getOne({ paymentId: req.params.paymentId });
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Updated,
      statusCode: HttpStatusCodeEnum.Ok,
      data: updatedPayment,
    });
  }),
  // GET
  getStatistics: catchAsync(async (req, res) => {
    const statistics = await PaymentsService.getStatistics();
    return res.status(HttpStatusCodeEnum.Ok).json({
      status: HttpStatusEnum.Success,
      statusCode: HttpStatusCodeEnum.Ok,
      data: statistics,
    });
  }),
};
