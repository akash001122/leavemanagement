'use strict';

module.exports = {
  method: 'GET',
  path: '/user/get-all',
  options: {
    auth: 'jwt',
    description: 'Get all User details',
    notes: 'Fetches all user details which can be done only by hr',
    tags: ['api'],
    plugins: {
      hapiAuthorization: {
        roles: ['HR'],
      },
    },
    handler: require('../handlers/get_all_users'),
  },
};
