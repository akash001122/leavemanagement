'use strict';
const {deptHandler} = require('../handlers/delete_dept');

module.exports = {
  method: 'PUT',
  path: '/department',
  handler: deptHandler,
  options: {
    auth: 'jwt',
    description: 'Delete department',
    notes: 'Updates department so that its visibility is inactive which can be done only by hr',
    tags: ['api'],
    validate: require('../validations/delete_dept'),
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
  },
};
