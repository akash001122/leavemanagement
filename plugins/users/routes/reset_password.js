'use strict';

module.exports = {
  method: 'PUT',
  path: '/password/{userId}',

  options: {
    auth: 'jwt',
    description: 'Reset Password',
    notes: 'Resets password of user by the id passed through path which can be done only by hr',
    tags: ['api'],
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
    validate: require('../validations/reset_password'),
    handler: require('../handlers/reset_password'),
  },
};
