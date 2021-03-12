'use strict';
const departmentIdValidator = require('../../department/validations/array_departmentId');
const {employeeHandler} = require('../handlers/get_emp_by_dept');


module.exports = {
    method: 'GET',
    path: '/employee/department/{departmentId}',
    options: {
        auth: 'jwt',
        description: 'Get Employee',
        notes: 'Fetches employee details by the employeeid passed in path which can be done only by hr',
        tags: ['api'],
        plugins: {
            'hapiAuthorization': {
                roles: ['HR']
            }
        },
        validate: {
            query: departmentIdValidator,
        },
        handler: employeeHandler,
    }
};
