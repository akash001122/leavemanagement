const Joi = require('joi');


exports.deptBodyValidation =  Joi.object({
        name : Joi.string().required(),
        manager: Joi.string().required()
});

exports.deptValidation = Joi.object({
    name : Joi.string().required()
})