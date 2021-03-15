'use strict';
const employeeDetailValidator = require('../validations/updateEmployeeDetail');
const employeeIdValidator = require('../validations/employee_id');
const {employeeHandler} = require('../handlers/put_emp');

module.exports = {
  method: 'PUT',
  path: '/employee/{employeeId}',
  options: {
    auth: 'jwt',
    description: 'Update Employee',
    notes: 'Updates employee details by the id passes through path which can be done only by hr',
    tags: ['api'],
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
    validate: {
      payload: employeeDetailValidator,
      params: employeeIdValidator,
    },
    handler: employeeHandler,
  },
};
