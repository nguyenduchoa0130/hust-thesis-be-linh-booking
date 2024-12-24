const Joi = require('joi');
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  tourIdSchema: Joi.object({
    id: Joi.string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'ID is required',
      }),
  }),
};
