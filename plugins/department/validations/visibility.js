const Joi = require('joi');

module.exports = Joi.object({
  visible: Joi.boolean(),
});
