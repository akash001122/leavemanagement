'use strict';

const Joi = require('joi');

module.exports = {
  query: Joi.object({
    employeeId: Joi.array().items(Joi.number().integer()).single(),
  }),
};
