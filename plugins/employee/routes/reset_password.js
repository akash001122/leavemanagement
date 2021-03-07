'use strict';
const{employeeIdValidator} = require('../validations/put_emp');
const {employeeHandler} = require('../handlers/reset_password.js');
const Joi = require('joi');


module.exports = {
    method: 'PUT',
    path: '/password/{empId}',
    handler: employeeHandler,
    options: {
        auth: 'jwt',
        description: 'Reset Password',
        notes: 'Resets password of an employee by the id passed through path which can be done only by hr',
        tags: ['api'],
        validate: {
            payload: Joi.object({
                password: Joi.string().required()
            }),
            params: employeeIdValidator,
        }
    },
};