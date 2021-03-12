'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    leaveStatus : Joi.string(),
})