'use strict';
const {leaveHandler} = require('../handlers/get_all_leaves');

module.exports = {
    method: 'GET',
    path: '/leave',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        description: 'Get leave',
        notes: 'Returns all the leaves applied by the employee',
        tags: ['api'],
        plugins: {
            'hapiAuthorization': {
                roles: ['HR', 'MANAGER','EMPLOYEE']
            }
        }
    }
};