'use strict';

const Joi = require('joi');

module.exports = Joi.object({
  leaveId: Joi.number().integer(),
});
