const Joi = require('joi');


exports.loginValidation =  Joi.object({
        userName : Joi.string().required(),
        password : Joi.string().required(),
});