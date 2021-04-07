'use strict';

const Joi = require('joi');

module.exports = {
  params: Joi.object({
    leaveId: Joi.number().integer(),
  }),
  payload: Joi.object({
    leaveStatus: Joi.string(),
  }),
};
