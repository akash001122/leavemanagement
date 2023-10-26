'use strict';

const Joi = require('joi');

module.exports = {
  payload: Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    roleDescription: Joi.string().required(),
    userId: Joi.number().integer().required(),
    departmentId: Joi.number().integer().required(),
  }),
};
