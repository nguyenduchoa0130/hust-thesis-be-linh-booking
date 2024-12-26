const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  hotelIdSchema: joi.object({
    id: joi
      .objectId()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Hotel ID is required',
      }),
  }),
};
