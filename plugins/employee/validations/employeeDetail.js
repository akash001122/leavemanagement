'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    firstName : Joi.string().required(),
    lastName : Joi.string().required(),
    email: Joi.string().required(),
    mobile: Joi.string().required(),
    roleDescription: Joi.string().required(),
    userName: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.array().items(Joi.string()),
    departmentId: Joi.number().integer().required(),
})

