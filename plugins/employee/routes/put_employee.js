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
        description: 'Update Employee',
        notes: 'Updates employee details by the id passes through path which can be done only by hr',
        tags: ['api'],
        validate: {
            payload: employeeDetailValidator,
            params: employeeIdValidator,
        }
    },
};