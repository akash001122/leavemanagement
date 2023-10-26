'use strict';
const {deptHandler} = require('../handlers/update_dept');

module.exports = {
  method: 'PUT',
  path: '/department/{departmentId}',
  handler: deptHandler,
  options: {
    auth: 'jwt',
    description: 'Update department',
    notes: 'Updates department which can be done only by hr',
    tags: ['api'],
    validate: require('../validations/update_dept'),
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
  },
};
