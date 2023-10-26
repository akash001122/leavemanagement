'use strict';
const {deptHandler} = require('../handlers/create_dept');

module.exports = {
  method: 'POST',
  path: '/department',
  handler: deptHandler,
  options: {
    auth: 'jwt',
    description: 'Create new department',
    notes: 'Creates new department which can be done only by hr',
    tags: ['api'],
    validate: require('../validations/create_department.js'),
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
  },
};
