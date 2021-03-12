'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    employeeId : Joi.number().integer().required()
})
