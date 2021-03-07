const Joi = require('joi');


exports.leaveIdValidator =  Joi.object({
       leaveId: Joi.number().integer()
});

exports.leaveDetailValidator =  Joi.object({
        leaveType : Joi.string(),
        startDate : Joi.date(),
        endDate : Joi.date(),
        leaveDescription: Joi.string()
});