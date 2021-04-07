'use strict';

const Joi = require('joi');

module.exports = {
  params: Joi.object({
    employeeId: Joi.number().integer().required(),
  }),
  payload: Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    mobile: Joi.string(),
    roleDescription: Joi.string(),
    userName: Joi.string(),
    role: Joi.string(),
    departmentId: Joi.number().integer(),
  }),
};
