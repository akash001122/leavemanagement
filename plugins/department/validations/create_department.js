const Joi = require('joi');

module.exports = {
  payload: Joi.object({
    name: Joi.string().required(),
  }),
};
