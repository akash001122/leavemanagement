'use strict';

const Joi = require('joi');

exports.employeeDetailValidator = Joi.object({
    firstName : Joi.string(),
    lastName : Joi.string(),
    email: Joi.string(),
    mobile: Joi.string(),
    roleDescription: Joi.string(),
    userName: Joi.string(),
    role: Joi.string(),
    depId: Joi.number().integer(),
})

exports.employeeIdValidator = Joi.object({
    empId : Joi.number().integer(),
})