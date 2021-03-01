'use strict';
const {employeeDetailValidator} = require('../validations/get_emp');
const {employeeHandler} = require('../handlers/get_emp');


module.exports = {
    method: 'GET',
    path: '/employee/{empId}',
    handler: employeeHandler,
    options: {
        auth: 'jwt',
        description: 'Get Employee',
        notes: 'Fetches employee details by the employeeid passed in path which can be done only by hr',
        tags: ['api'],
        validate: {
            params: employeeDetailValidator,
        }
    },
};
