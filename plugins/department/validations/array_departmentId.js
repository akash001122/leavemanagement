'use strict';

const Joi = require('joi');

module.exports = Joi.object({
  departmentId: Joi.array().items(Joi.number()).single(),
});
