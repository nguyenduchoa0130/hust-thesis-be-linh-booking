const joi = require('joi');
const { ValidationTypeEnum } = require('../../enums');

module.exports = {
  createTourDestinationSchema: joi.object({
    name: joi
      .string()
      .required()
      .messages({
        [ValidationTypeEnum.Required]: 'Name is required',
      }),
    desc: joi.string().optional(),
    ggMap: joi.string().optional(),
  }),
};
