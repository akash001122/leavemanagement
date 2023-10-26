'use strict';
const {leaveHandler} = require('../handlers/create_leave');

module.exports = {
  method: 'POST',
  path: '/leave/create',
  handler: leaveHandler,
  options: {
    auth: 'jwt',
    description: 'Apply Leave',
    notes: 'Creates a record of leave of the employee whose id is passed by jwt',
    tags: ['api'],
    validate: require('../validations/create_leave'),
    plugins: {
      hapiAuthorization: {
        roles: ['HR', 'MANAGER', 'EMPLOYEE'],
      },
    },
  },
};
