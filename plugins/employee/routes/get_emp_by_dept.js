'use strict';
const {employeeHandler} = require('../handlers/get_emp_by_dept');

module.exports = {
  method: 'GET',
  path: '/employee/department/{departmentId}',
  options: {
    auth: 'jwt',
    description: 'Get Employee',
    notes: 'Fetches employee details by the employeeid passed in path which can be done only by hr',
    tags: ['api'],
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
    validate: require('../validations/get_emp_by_dept'),
    handler: employeeHandler,
  },
};
