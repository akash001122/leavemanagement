const Joi = require('joi');

module.exports = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});
