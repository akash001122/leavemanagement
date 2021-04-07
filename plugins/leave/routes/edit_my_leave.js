'use strict';
const {leaveHandler} = require('../handlers/edit_my_leave');

module.exports = {
  method: 'PUT',
  path: '/leave/edit/{leaveId}',
  handler: leaveHandler,
  options: {
    auth: 'jwt',
    description: 'Update Leave',
    notes: 'Updates the leave already applied by the leave id passed in params',
    tags: ['api'],
    validate: require('../validations/edit_my_leave'),
    plugins: {
      hapiAuthorization: {
        roles: ['HR', 'MANAGER', 'EMPLOYEE'],
      },
    },
  },
};
