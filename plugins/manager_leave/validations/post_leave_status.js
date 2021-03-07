'use strict';

const Joi = require('joi');

exports.leaveIdValidator = Joi.object({
    leaveId : Joi.number().integer(),
})
exports.leavePayloadValidator = Joi.object({
    leaveStatus : Joi.string(),
})