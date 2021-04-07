'use strict';
const {leaveHandler} = require('../handlers/get_all_leaves');

module.exports = {
  method: 'GET',
  path: '/leave/get-all',
  handler: leaveHandler,
  options: {
    auth: 'jwt',
    description: 'Get Leaves of all Employees',
    notes: 'Fetches employee leave details which can be done only by hr',
    tags: ['api'],
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
  },
};
