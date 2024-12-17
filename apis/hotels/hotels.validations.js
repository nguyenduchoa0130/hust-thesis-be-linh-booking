const joi = require('joi');
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  hotelIdSchema: joi.object({
    id: joi
      .string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .messages({
        [ValidationTypeEnum.StringPattern]: 'Invalid hotel id',
      }),
  }),
};
