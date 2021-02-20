'use strict';
const {employeeDetailValidator} = require('../validations/get_emp');
const {employeeHandler} = require('../handlers/get_emp');


module.exports = {
    method: 'GET',
    path: '/employee/{empId}',
    handler: employeeHandler,
    options: {
            auth: false,
            validate: {
            params: employeeDetailValidator,
        }
    },
};
