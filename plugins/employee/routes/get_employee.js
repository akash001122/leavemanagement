'use strict';
const employeeIdValidator = require('../validations/Array_employee_Id');
const {employeeHandler} = require('../handlers/get_emp');

module.exports = {
  method: 'GET',
  path: '/employee',
  options: {
    auth: 'jwt',
    description: 'Get Employee',
    notes: 'Fetches employee details by the employeeid passed in path which can be done only by hr',
    tags: ['api'],
    plugins: {
      hapiAuthorization: {
        roles: ['HR', 'MANAGER'],
      },
    },
    validate: {
      query: employeeIdValidator,
    },
    handler: employeeHandler,
  },
};
