'use strict';
const {leaveHandler} = require('../handlers/update_leave_status');

module.exports = {
  method: 'POST',
  path: '/leave/update/{leaveId}',
  handler: leaveHandler,
  options: {
    auth: 'jwt',
    description: 'Set leavestatus of Leaves of Employee',
    notes: 'Approve or reject employee leaves by the employeeid passed through path which can be done only by manager',
    tags: ['api'],
    validate: require('../validations/update_leave_status'),
    plugins: {
      hapiAuthorization: {
        roles: ['MANAGER'],
      },
    },
  },
};
