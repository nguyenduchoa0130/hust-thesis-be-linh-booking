const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  tourIdSchema: Joi.object({
    id: Joi.objectId()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Tour ID is required',
      }),
  }),
};
