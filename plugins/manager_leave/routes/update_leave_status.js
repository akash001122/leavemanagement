'use strict';
const { employeeIdValidator } = require('../../employee/validations/put_emp');
const {leaveHandler} = require('../handlers/update_leave_status');


module.exports = {
    method: 'PUT',
    path: '/manager/leave/{empId}',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        validate: {
            params: employeeIdValidator
        }
    },
};