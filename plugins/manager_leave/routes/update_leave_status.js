'use strict';
const { employeeIdValidator } = require('../../employee/validations/put_emp');
const {leaveHandler} = require('../handlers/post_leave_status');


module.exports = {
    method: 'PUT',
    path: '/manager/leave/{empId}',
    handler: leaveHandler,
    options: {
        auth: false,
        validate: {
            params: employeeIdValidator
        }
    },
};