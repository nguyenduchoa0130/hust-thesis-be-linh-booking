const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

module.exports = {
  userIdSchema: joi.object({
    userId: joi.objectId().required(),
  }),
  createUserSchema: joi.object({
    email: joi.string().required().email(),
    password: joi.string().required().min(6),
    fullName: joi.string().required(),
    dateOfBirth: joi.date().required(),
    phone: joi.string().required(),
    gender: joi.string().required().valid('male', 'female', 'other'),
    role: joi.string().required(),
  }),
};
