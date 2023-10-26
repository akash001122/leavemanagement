'use strict';

module.exports = {
  method: 'GET',
  path: '/user/{userId}',
  options: {
    auth: 'jwt',
    description: 'Get User details by id',
    notes: 'Fetches user details which can be done only by hr',
    tags: ['api'],
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
    validate: require('../validations/get_user_by_id'),
    handler: require('../handlers/get_user_by_id'),
  },
};
