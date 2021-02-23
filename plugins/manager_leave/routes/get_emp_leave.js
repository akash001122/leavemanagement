'use strict';
const { employeeIdValidator } = require('../../employee/validations/put_emp');
const {leaveHandler} = require('../../hr_leave/handlers/get_emp_leave');


module.exports = {
    method: 'GET',
    path: '/manager/leave/{empId}',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        validate: {
            params: employeeIdValidator
        }
    },
};