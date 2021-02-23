'use strict';
const {employeeDetailValidator} = require('../validations/create_emp');
const {employeeHandler} = require('../handlers/create_emp');


module.exports = {
    method: 'POST',
    path: '/employee',
    handler: employeeHandler,
    options: {
        auth: 'jwt',
        validate: {
            payload: employeeDetailValidator,
        }
    },
};