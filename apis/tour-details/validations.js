const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  tourDetailSchema: Joi.object({
    title: Joi.string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Title is required',
      }),
    hotel: Joi.string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Hotel is required',
      }),
    destination: Joi.string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Destination is required',
      }),
    desc: Joi.string().optional().allow(''),
  }),
  tourDetailIdSchema: Joi.object({
    tourDetailId: Joi.objectId().required(),
  }),
};
