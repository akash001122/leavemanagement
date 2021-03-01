'use strict';
const {leaveHandler} = require('../../manager_leave/handlers/get_all_leaves');


module.exports = {
    method: 'GET',
    path: '/manager/leave',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        description: 'Get Leaves of all Employees',
        notes: 'Fetches employee leave details which can be done only by manager',
        tags: ['api'],
    },
};