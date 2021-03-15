const Joi = require('joi');

module.exports = Joi.object({
  leaveType: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  leaveDescription: Joi.string(),
});
