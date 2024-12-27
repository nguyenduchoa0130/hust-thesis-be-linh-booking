const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  tourCategorySchema: joi.object({
    name: joi
      .string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Name is required',
      }),
    maxParticipants: joi
      .number()
      .integer()
      .required()
      .min(1)
      .messages({
        [ValidationTypeEnum.Required]: 'Max participants is required',
        [ValidationTypeEnum.MinLength]: 'Max participants must be greater than 0',
        [ValidationTypeEnum.NumberInteger]: 'Max participants must be an integer',
      }),
    desc: joi.string().optional().allow(''),
  }),
  categoryIdSchema: joi.object({
    id: joi
      .objectId()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Category ID is invalid or not provided',
      }),
  }),
};
