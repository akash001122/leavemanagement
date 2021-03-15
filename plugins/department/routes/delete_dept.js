'use strict';
const {deptHandler} = require('../handlers/delete_dept');
const departmentIdValidator = require('../validations/array_departmentId');

module.exports = {
  method: 'DELETE',
  path: '/department',
  handler: deptHandler,
  options: {
    auth: 'jwt',
    description: 'Delete department',
    notes: 'Updates department so that its visibility is inactive which can be done only by hr',
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
