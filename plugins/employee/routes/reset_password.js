'use strict';
const employeeIdValidator = require('../validations/employee_id');
const passwordValidator = require('../validations/password');
const {employeeHandler} = require('../handlers/reset_password.js');

module.exports = {
    method: 'PUT',
    path: '/password/{employeeId}',

    options: {
        auth: 'jwt',
        description: 'Reset Password',
        notes: 'Resets password of an employee by the id passed through path which can be done only by hr',
        tags: ['api'],
        plugins: {
            'hapiAuthorization': {
                roles: ['HR']
            }
        },
        validate: {
            payload: passwordValidator,
            params: employeeIdValidator
        },
        handler: employeeHandler
    }
};