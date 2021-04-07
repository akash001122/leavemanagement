'use strict';
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
    validate: require('../validations/delete_employee'),
  },
  handler: employeeHandler,
};
