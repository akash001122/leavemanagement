const Joi = require('joi');


exports.leaveDetailValidator =  Joi.object({
        leaveType : Joi.string().required(),
        startDate : Joi.date().required(),
        endDate : Joi.date().required(),
        leaveDescription: Joi.string().required()
});