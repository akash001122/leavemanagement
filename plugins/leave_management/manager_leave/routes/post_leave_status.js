'use strict';
const leaveIdValidator = require('../validations/leaveId');
const leavePayloadValidator = require('../validations/leavePayload');
const {leaveHandler} = require('../handlers/post_leave_status');

module.exports = {
  method: 'POST',
  path: '/manager/leave/{leaveId}',
  handler: leaveHandler,
  options: {
    auth: 'jwt',
    description: 'Set leavestatus of Leaves of Employee',
    notes: 'Approve or reject employee leaves by the employeeid passed through path which can be done only by manager',
    tags: ['api'],
    validate: {
      params: leaveIdValidator,
      payload: leavePayloadValidator,
    },
    plugins: {
      hapiAuthorization: {
        roles: ['MANAGER'],
      },
    },
  },
};
