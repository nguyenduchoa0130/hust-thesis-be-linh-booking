const joi = require('joi');
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  createTourCategorySchema: joi.object({
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
    desc: joi.string().optional(),
  }),
};
