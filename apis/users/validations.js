const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

module.exports = {
  userIdSchema: Joi.object({
    userId: Joi.objectId().required(),
  }),
};
