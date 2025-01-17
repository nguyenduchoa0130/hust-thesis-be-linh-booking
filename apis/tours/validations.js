const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  tourSchema: Joi.object({
    name: Joi.string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Name is required',
      }),
    introduction: Joi.string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Introduction is required',
      }),
    price: Joi.number()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Price is required',
      }),
    dayCount: Joi.number()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Day count is required',
      }),
    nightCount: Joi.number()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Night count is required',
      }),
    category: Joi.string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Category is required',
      }),
    transports: Joi.array()
      .items(Joi.string().required())
      .messages({
        [ValidationTypeEnum.Required]: 'Each transport must be a string',
      }),
    details: Joi.array()
      .items(Joi.string().required())
      .messages({
        [ValidationTypeEnum.Required]: 'Each detail must be a string',
      }),
    owner: Joi.objectId().optional(),
    tourRequest: Joi.objectId().optional(),
  }),
  tourIdSchema: Joi.object({
    id: Joi.objectId()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'ID is required',
      }),
  }),
};
