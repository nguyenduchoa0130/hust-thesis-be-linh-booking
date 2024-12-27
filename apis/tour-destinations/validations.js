const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  tourDestinationSchema: joi.object({
    name: joi
      .string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Name is required',
      }),
    desc: joi.string().optional().allow(''),
    ggMap: joi.string().optional().allow(''),
  }),
  tourDestinationIdSchema: joi.object({
    id: joi
      .objectId()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Destination ID is required',
      }),
  }),
};
