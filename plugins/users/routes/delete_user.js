'use strict';

module.exports = {
  method: 'DELETE',
  path: '/user/{userId}',
  options: {
    auth: 'jwt',
    description: 'Delete User',
    notes: 'Updates visibility column of user so that the row becomes inactive, which can be done only by hr',
    tags: ['api'],
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
    validate: require('../validations/delete_user'),
  },
  handler: require('../handlers/delete_user'),
};
