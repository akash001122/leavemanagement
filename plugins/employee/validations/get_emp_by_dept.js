'use strict';

const Joi = require('joi');

module.exports = {
  query: Joi.object({
    departmentId: Joi.array().items(Joi.number()).single(),
  }),
};
