'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    employeeId : Joi.array().items(Joi.number()).single()
})
