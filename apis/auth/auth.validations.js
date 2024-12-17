const joi = require('joi');
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  registerSchema: joi.object({
    email: joi
      .string()
      .required()
      .email()
      .messages({
        [ValidationTypeEnum.Required]: 'Email is required',
        [ValidationTypeEnum.Email]: 'Invalid email',
      }),
  }),
  password: joi
    .string()
    .required()
    .min(6)
    .messages({
      [ValidationTypeEnum.Required]: 'Password is required',
      [ValidationTypeEnum.MinLength]: 'Password must be at least 6 characters long',
    }),
  fullName: joi
    .string()
    .required()
    .messages({
      [ValidationTypeEnum.Required]: 'Name is required',
    }),
  phone: joi
    .string()
    .required()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .messages({
      [ValidationTypeEnum.Required]: 'Phone number is required',
      [ValidationTypeEnum.StringPattern]: 'Invalid phone number',
    }),
  gender: joi.string().valid(['male', 'female', 'other']).message('Invalid gender'),
};
