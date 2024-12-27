const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  tourTransportSchema: joi.object({
    name: joi
      .string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Name is required',
      }),
    iconName: joi
      .string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Icon name is required',
      }),
    desc: joi.string().optional().allow(''),
  }),
  tourTransportIdSchema: joi.object({
    id: joi
      .objectId()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Transport ID is invalid or not provided',
      }),
  }),
};
