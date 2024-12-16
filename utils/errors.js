const { HttpStatusCodeEnum } = require('../enums');

module.exports = {
  /**
   * Create a bad request error
   * @param {string} msg
   * @returns {Error}
   */
  createBadRequest: (msg) => {
    const error = new Error(msg);
    error.status = 'Bad Request';
    error.statusCode = HttpStatusCodeEnum.BadGateway;
    return error;
  },

  /**
   * Create a unauthorize error
   * @param {string} msg
   * @returns {Error}
   */
  createUnauthorized: (msg) => {
    const error = new Error(msg);
    error.status = 'Unauthorized';
    error.statusCode = HttpStatusCodeEnum.Unauthorized;
    return error;
  },

  /**
   * Create a forbidden error
   * @param {string} msg
   * @returns {Error}
   */
  createForbidden: (msg) => {
    const error = new Error(msg);
    error.status = 'Forbidden';
    error.statusCode = HttpStatusCodeEnum.Forbidden;
    return error;
  },

  /**
   * Create a not found error
   * @param {string} msg
   * @returns {Error}
   */
  createNotFound: (msg) => {
    const error = new Error(msg);
    error.status = 'Not found';
    error.statusCode = HttpStatusCodeEnum.NotFound;
    return error;
  },

  /**
   * Create an internal error
   * @param {string} msg
   * @returns {Error}
   */
  createInternalServerError: (msg) => {
    const error = new Error(msg);
    error.status = 'Internal Server Error';
    error.statusCode = HttpStatusCodeEnum.InternalServerError;
    return error;
  },
};
