'use strict';

const Joi = require('joi');

module.exports = Joi.object({
    departmentId : Joi.number().integer().required()
})
