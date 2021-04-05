'use strict';

const Joi = require('joi');

module.exports = {
  params: Joi.object({
    employeeId: Joi.array().items(Joi.number()).single(),
  }),
  payload: Joi.object({
    visibility: Joi.boolean(),
  }),
};
