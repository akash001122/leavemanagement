'use strict';
const { employeeIdValidator } = require('../../employee/validations/put_emp');
const {leaveHandler} = require('../handlers/get_emp_leave');


module.exports = {
    method: 'GET',
    path: '/hr/leave/{empId}',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        description: 'Get Leaves of Employee',
        notes: 'Fetches employee leave details by the employeeid passed through path which can be done only by hr',
        tags: ['api'],
        validate: {
            params: employeeIdValidator
        }
    },
};