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
  TourBookingStatusEnum,
} = require('../../enums');

module.exports = {
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
      const requestBody = createMoMoRequestBody(paymentMethod, paymentInfo);
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
      const err = new Error(error?.data.message);
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
      await Promise.all([
        PaymentsService.update({ _id: payment._id }, { status: PaymentStatusEnum.Paid }),
        TourBookingsService.update(
          { payment: payment._id },
          { status: TourBookingStatusEnum.Confirmed },
        ),
      ]);
      return res.status(HttpStatusCodeEnum.Ok).send({
        status: HttpStatusEnum.Updated,
        statusCode: HttpStatusCodeEnum.Ok,
        message: 'Your payment and tour booking have been updated',
      });
    } else {
      logger.error(`Error in completed payment: ${JSON.stringify(req.body)}`);
      return res.status(HttpStatusCodeEnum.NoContent).send();
    }
  }),
};
