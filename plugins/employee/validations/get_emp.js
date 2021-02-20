'use strict';

const Joi = require('joi');

exports.employeeDetailValidator = Joi.object({
    empId : Joi.number().integer(),
})
