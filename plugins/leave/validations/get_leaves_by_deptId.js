'use strict';

const Joi = require('joi');

module.exports = {
  params: Joi.object({
    deptId: Joi.number().integer(),
  }),
};
