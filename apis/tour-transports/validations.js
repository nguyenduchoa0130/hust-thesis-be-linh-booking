const joi = require('joi');
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  createTransportSchema: joi.object({
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
    desc: joi.string().optional(),
  }),
};
