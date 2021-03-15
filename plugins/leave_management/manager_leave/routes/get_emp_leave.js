'use strict';
const employeeIdValidator = require('../../../employee/validations/Array_employee_Id');
const {leaveHandler} = require('../handlers/get_emp_leave');

module.exports = {
  method: 'GET',
  path: '/manager/leave/id',
  handler: leaveHandler,
  options: {
    auth: 'jwt',
    description: 'Get Leaves of Employee',
    notes: 'Fetches employee leave details by the employeeid passed through path which can be done only by manager',
    tags: ['api'],
    validate: {
      query: employeeIdValidator,
    },
    plugins: {
      hapiAuthorization: {
        roles: ['MANAGER'],
      },
    },
  },
};
