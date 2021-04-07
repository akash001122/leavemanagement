'use strict';
const {leaveHandler} = require('../handlers/get_leaves_by_deptId');

module.exports = {
  method: 'GET',
  path: '/leave/{deptId}',
  handler: leaveHandler,
  options: {
    auth: 'jwt',
    description: 'Get Leaves of Employees By department Id',
    notes: 'Fetches employee leave details by department which can be done only by manager or hr',
    tags: ['api'],
    validate: require('../validations/get_leaves_by_deptId'),
    plugins: {
      hapiAuthorization: {
        roles: ['MANAGER', 'HR'],
      },
    },
  },
};
