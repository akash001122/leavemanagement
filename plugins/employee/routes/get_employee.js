'use strict';
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
    validate: require('../validations/get_employee'),
    handler: employeeHandler,
  },
};
