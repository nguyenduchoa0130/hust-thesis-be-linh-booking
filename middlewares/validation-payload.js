const { errorsUtil } = require('../utils');

/**
 * @param {'body' | 'params' | 'query'} place
 * @param {any} schema
 * @returns {any}
 */
const validationPayloadMiddleware = (place, schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[place]);
    if (error) {
      const validationErrors = error.details.map((error) => error.message);
      return next(errorsUtil.createBadRequest(validationErrors[0] || 'Bad request'));
    }
    return next();
  };
};

module.exports = validationPayloadMiddleware;
