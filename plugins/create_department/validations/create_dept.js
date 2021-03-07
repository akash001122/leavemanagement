const Joi = require('joi');


exports.deptBodyValidation =  Joi.object({
        name : Joi.string(),
        visible: Joi.boolean()
});

exports.deptValidation = Joi.object({
    id : Joi.number().integer().required()
})

