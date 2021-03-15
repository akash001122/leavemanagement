'use strict';
const employeeDetailValidator = require('../validations/employeeDetail');
const {employeeHandler} = require('../handlers/create_emp');

module.exports = {
  method: 'POST',
  path: '/employee',
  options: {
    auth: 'jwt',
    description: 'Create Employee',
    notes: 'Creates an employee which can be done only by hr',
    tags: ['api'],
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
    validate: {
      payload: employeeDetailValidator,
    },
    handler: employeeHandler,
  },
};
