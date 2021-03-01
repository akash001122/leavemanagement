'use strict';
const { employeeIdValidator } = require('../../employee/validations/put_emp');
const {leaveHandler} = require('../handlers/post_leave_status');


module.exports = {
    method: 'POST',
    path: '/manager/leave/{empId}',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        description: 'Set leavestatus of Leaves of Employee',
        notes: 'Approve or reject employee leaves by the employeeid passed through path which can be done only by manager',
        tags: ['api'],
        validate: {
            params: employeeIdValidator
        }
    },
};