'use strict';

const Joi = require('joi');

exports.employeeDetailValidator = Joi.object({
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    roleDescription: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
    depId: Joi.number().integer().required(),
})

