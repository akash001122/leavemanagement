'use strict';
const {leaveHandler} = require('../handlers/get_leave');


module.exports = {
    method: 'GET',
    path: '/leave',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        description: 'Get leave',
        notes: 'Returns the leaves applied by the employee whose id is passed by jwt',
        tags: ['api'],
    },
};