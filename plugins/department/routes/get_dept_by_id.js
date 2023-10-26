'use strict';
const {deptHandler} = require('../handlers/get_dept_by_id');

module.exports = {
  method: 'GET',
  path: '/department/{departmentId}',
  handler: deptHandler,
  options: {
    auth: 'jwt',
    description: 'Get department by id',
    notes: 'Fetches department details which can be done only by hr',
    tags: ['api'],
    validate: require('../validations/get_dept_by_id'),
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
  },
};
