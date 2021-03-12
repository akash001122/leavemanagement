'use strict';
const {leaveHandler} = require('../handlers/get_all_leaves');


module.exports = {
    method: 'GET',
    path: '/hr/leave',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        description: 'Get Leaves of all Employees',
        notes: 'Fetches employees leave details which can be done only by hr',
        tags: ['api'],
        plugins: {
            'hapiAuthorization': {
                roles: ['HR']
            }
        }
    },
};