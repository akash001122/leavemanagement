'use strict';

module.exports = {
  method: 'POST',
  path: '/user',
  options: {
    auth: 'jwt',
    description: 'Create User',
    notes: 'Create user which can be done only by hr',
    tags: ['api'],
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
    validate: require('../validations/create_user'),
    handler: require('../handlers/create_user'),
  },
};
