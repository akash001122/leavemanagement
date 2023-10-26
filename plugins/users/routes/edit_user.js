'use strict';

module.exports = {
  method: 'PUT',
  path: '/user/{userId}',
  options: {
    auth: 'jwt',
    description: 'Edit User Role',
    notes: 'Edit user which can be done only by hr',
    tags: ['api'],
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
    validate: require('../validations/edit_user'),
    handler: require('../handlers/edit_user'),
  },
};
