const { HttpStatusCodeEnum } = require('../enums');
const { logger } = require('../utils');

require('dotenv').config();

const ErrorHandlerMiddleware = (err, req, res, next) => {
  const status = err.status || 'Internal error error';
  const statusCode = Number(err.statusCode) || HttpStatusCodeEnum.InternalServerError;
  const message = err.message || 'Internal server error. An error occurred in request progress';
  logger.error('A critical error occurred:', err);
  if (statusCode === HttpStatusCodeEnum.InternalServerError) {
    logger.error(err.stack);
  }
  return res.status(statusCode).json({ status, statusCode, message });
};

module.exports = ErrorHandlerMiddleware;
