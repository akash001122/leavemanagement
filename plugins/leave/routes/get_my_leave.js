'use strict';
const {leaveHandler} = require('../handlers/get_my_leave');

module.exports = {
  method: 'GET',
  path: '/leave/my/{leaveId}',
  handler: leaveHandler,
  options: {
    auth: 'jwt',
    description: 'Get leave',
    notes: 'Returns the leaves applied by the employee whose leave id passed in params',
    tags: ['api'],
    validate: require('../validations/get_my_leave'),
    plugins: {
      hapiAuthorization: {
        roles: ['HR', 'MANAGER', 'EMPLOYEE'],
      },
    },
  },
};
