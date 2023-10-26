'use strict';

const Joi = require('joi');

module.exports = {
  params: Joi.object({
    leaveId: Joi.number().integer(),
  }),
  payload: Joi.object({
    leaveType: Joi.string(),
    startDate: Joi.date(),
    endDate: Joi.date(),
    leaveDescription: Joi.string(),
  }),
};
