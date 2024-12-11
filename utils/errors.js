const { HttpStatusEnum } = require('../enums');

module.exports = {
  /**
   * Create a bad request error
   * @param {string} msg
   * @returns {Error}
   */
  createBadRequest: (msg) => {
    const error = new Error(msg);
    error.status = 'Bad Request';
    error.statusCode = HttpStatusEnum.BadRequest;
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
    error.statusCode = HttpStatusEnum.Unauthorized;
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
    error.statusCode = HttpStatusEnum.Forbidden;
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
    error.statusCode = HttpStatusEnum.NotFound;
    return error;
  },
};
