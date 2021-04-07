'use strict';
const {leaveHandler} = require('../handlers/get_emp_leave');

module.exports = {
  method: 'GET',
  path: '/leave/id',
  handler: leaveHandler,
  options: {
    auth: 'jwt',
    description: 'Get Leaves of Employee',
    notes:
      'Fetches employee leave details by the employeeid passed through path which can be done only by hr or manager',
    tags: ['api'],
    validate: require('../validations/get_emp_leave'),
    plugins: {
      hapiAuthorization: {
        roles: ['MANAGER', 'HR'],
      },
    },
  },
};
