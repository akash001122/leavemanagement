'use strict';

const Joi = require('joi');

module.exports = {
  params: Joi.object({
    userId: Joi.string().required(),
  }),
  payload: Joi.object({
    password: Joi.string().required(),
  }),
};
