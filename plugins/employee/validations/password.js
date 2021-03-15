'use strict';

const Joi = require('joi');

module.exports = Joi.object({
  password: Joi.string().required(),
});
