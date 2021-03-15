'use strict';
const leaveDetailValidator = require('../validations/leavePayload');
const {leaveHandler} = require('../handlers/create_leave');

module.exports = {
  method: 'POST',
  path: '/leave',
  handler: leaveHandler,
  options: {
    auth: 'jwt',
    description: 'Apply Leave',
    notes: 'Creates a record of leave of the employee whose id is passed by jwt',
    tags: ['api'],
    validate: {
      payload: leaveDetailValidator,
    },
    plugins: {
      hapiAuthorization: {
        roles: ['HR', 'MANAGER', 'EMPLOYEE'],
      },
    },
  },
};
