const Joi = require('joi');
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  tourDetailSchema: Joi.object({
    title: Joi.string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Title is required',
      }),
    desc: Joi.string().optional(),
    hotel: Joi.string()
      .optional()
      .messages({
        [ValidationTypeEnum.Required]: 'Hotel is required',
      }),
    destination: Joi.string()
      .optional()
      .messages({
        [ValidationTypeEnum.Required]: 'Destination is required',
      }),
  }),
};
