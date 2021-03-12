'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    firstName : Joi.string(),
    lastName : Joi.string(),
    email: Joi.string(),
    mobile: Joi.string(),
    roleDescription: Joi.string(),
    userName: Joi.string(),
    role: Joi.string(),
    departmentId: Joi.number().integer(),
})