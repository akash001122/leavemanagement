'use strict';
const {deptHandler} = require('../handlers/get_dept_by_id');
const departmentIdValidator = require('../validations/array_departmentId');

module.exports = {
  method: 'GET',
  path: '/department/{departmentId}',
  handler: deptHandler,
  options: {
    auth: 'jwt',
    description: 'Get department by id',
    notes: 'Fetches department details which can be done only by hr',
    tags: ['api'],
    validate: {
      query: departmentIdValidator,
    },
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
  },
};
