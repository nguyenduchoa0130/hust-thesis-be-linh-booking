const { HttpStatusEnum } = require('../enums');
const { logger } = require('../utils');

require('dotenv').config();

const errorHandlerMiddleware = (err, req, res, next) => {
  const status = err.status || 'Internal error error';
  const statusCode = Number(err.statusCode) || HttpStatusEnum.InternalServerError;
  const message = err.message || 'Internal server error. An error occurred in request progress';
  let tracing = undefined;

  if (statusCode === HttpStatusEnum.InternalServerError) {
    logger.error('A critical error occurred:', JSON.stringify(err));
  }
  if (process.env.NODE_ENV !== 'production' && statusCode === HttpStatusEnum.InternalServerError) {
    tracing = err.stack;
  }

  return res.status(statusCode).json({ status, statusCode, message, tracing });
};

module.exports = errorHandlerMiddleware;
