'use strict';

const Joi = require('joi');

module.exports = {
  params: Joi.object({
    employeeId: Joi.number().integer().required(),
  }),
};
