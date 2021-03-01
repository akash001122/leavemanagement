'use strict';
const {employeeDetailValidator} = require('../validations/create_emp');
const {employeeHandler} = require('../handlers/create_emp');


module.exports = {
    method: 'POST',
    path: '/employee',
    handler: employeeHandler,
    options: {
        auth: 'jwt',
        description: 'Create Employee',
        notes: 'Creates an employee which can be done only by hr',
        tags: ['api'],
        validate: {
            payload: employeeDetailValidator,
        }
    },
};