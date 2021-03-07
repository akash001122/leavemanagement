'use strict';
const Joi = require('joi');
const { employeeLeaveValidator } = require('../../employee/validations/get_emp');
const {leaveHandler} = require('../../manager_leave/handlers/get_emp_leave');


module.exports = {
    method: 'GET',
    path: '/manager/leave/{empId}',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        description: 'Get Leaves of Employee',
        notes: 'Fetches employee leave details by the employeeid passed through path which can be done only by manager',
        tags: ['api'],
        validate: {
            params: Joi.object({
                empId: Joi.number().integer()
            })
        }
    },
};