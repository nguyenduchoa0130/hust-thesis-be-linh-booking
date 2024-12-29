const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

module.exports = {
  requestIdSchema: joi.object({
    requestId: joi.objectId().required(),
  }),
};
