const Joi = require('joi');


module.exports =  Joi.object({
        leaveType : Joi.string().required(),
        startDate : Joi.date().required(),
        endDate : Joi.date().required(),
        leaveDescription: Joi.string().required()
});