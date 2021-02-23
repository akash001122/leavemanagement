'use strict';
const { employeeIdValidator } = require('../../employee/validations/put_emp');
const {leaveHandler} = require('../handlers/post_leave_status');


module.exports = {
    method: 'POST',
    path: '/manager/leave/{empId}',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        validate: {
            params: employeeIdValidator
        }
    },
};