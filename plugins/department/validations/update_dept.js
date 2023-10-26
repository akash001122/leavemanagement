'use strict';

const Joi = require('joi');

module.exports = {
  params: Joi.object({
    departmentId: Joi.number().integer().required(),
  }),
  payload: Joi.object({
    name: Joi.string().required(),
  }),
};
