'use strict';

const Joi = require('joi');

module.exports = {
  payload: Joi.object({
    userName: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.array().items(Joi.string()),
  }),
};
