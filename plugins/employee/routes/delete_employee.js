'use strict';

const employeeIdValidator = require('../validations/Array_employee_Id');
const {employeeHandler} = require('../handlers/delete_emp');
const visibilityValidator = require('../../department/validations/visibility');

module.exports = {
  method: 'PUT',
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
      payload: visibilityValidator,
    },
  },
  handler: employeeHandler,
};
