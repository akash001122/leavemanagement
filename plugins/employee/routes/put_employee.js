'use strict';
const {employeeDetailValidator} = require('../validations/put_emp');
const{employeeIdValidator} = require('../validations/put_emp');
const {employeeHandler} = require('../handlers/put_emp');


module.exports = {
    method: 'PUT',
    path: '/employee/{empId}',
    handler: employeeHandler,
    options: {
        auth: 'jwt',
        validate: {
            payload: employeeDetailValidator,
            params: employeeIdValidator,
        }
    },
};