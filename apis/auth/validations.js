const joi = require('joi');
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  signUpSchema: joi.object({
    email: joi
      .string()
      .required()
      .email()
      .messages({
        [ValidationTypeEnum.Required]: 'Email is required',
        [ValidationTypeEnum.Email]: 'Invalid email',
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
    dateOfBirth: joi
      .date()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Date of birth is required',
        [ValidationTypeEnum.Date]: 'Invalid date of birth',
      }),
    phone: joi
      .string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Phone number is required',
      }),
    gender: joi
      .string()
      .required()
      .valid('male', 'female', 'other')
      .messages({
        [ValidationTypeEnum.Required]: 'Gender is required',
        [ValidationTypeEnum.Valid]: 'Gender is not valid',
      }),
  }),
  signInSchema: joi.object({
    email: joi
      .string()
      .required()
      .email()
      .messages({
        [ValidationTypeEnum.Required]: 'Email is required',
        [ValidationTypeEnum.Email]: 'Invalid email',
      }),
    password: joi
      .string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Password is required',
      }),
  }),
  refreshTokenSchema: joi.object({
    email: joi
      .string()
      .required()
      .email()
      .messages({
        [ValidationTypeEnum.Required]: 'Email is required',
        [ValidationTypeEnum.Email]: 'Invalid email',
      }),
  }),
};
