'use strict';
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
    validate: require('../validations/put_employee'),
    handler: employeeHandler,
  },
};
