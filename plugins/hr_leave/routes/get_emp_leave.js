'use strict';
const { employeeIdValidator } = require('../../employee/validations/put_emp');
const {leaveHandler} = require('../handlers/get_emp_leave');


module.exports = {
    method: 'GET',
    path: '/hr/leave/{empId}',
    handler: leaveHandler,
    options: {
        auth: false,
        validate: {
            params: employeeIdValidator
        }
    },
};