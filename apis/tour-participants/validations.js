const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

module.exports = {
  tourBookingIdSchema: joi.object({
    tourBookingId: joi.objectId().required(),
  }),
};
