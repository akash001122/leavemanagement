'use strict';

const employeeIdValidator = require('../validations/Array_employee_Id');
const {employeeHandler} = require('../handlers/delete_emp');

module.exports = {
  method: 'DELETE',
  path: '/employee',
  options: {
    auth: 'jwt',
    description: 'Delete Employee',
    notes: 'Updates valid column of employee so that it the row becomes inactive, which can be done only by hr',
    tags: ['api'],
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
    validate: {
      query: employeeIdValidator,
    },
  },
  handler: employeeHandler,
};
