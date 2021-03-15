'use strict';
const {leaveHandler} = require('../handlers/get_leave');
const leaveIdValidator = require('../validations/leaveId');

module.exports = {
  method: 'GET',
  path: '/leave/{leaveId}',
  handler: leaveHandler,
  options: {
    auth: 'jwt',
    description: 'Get leave',
    notes: 'Returns the leaves applied by the employee whose leave id passed in params',
    tags: ['api'],
    validate: {
      params: leaveIdValidator,
    },
    plugins: {
      hapiAuthorization: {
        roles: ['HR', 'MANAGER', 'EMPLOYEE'],
      },
    },
  },
};
