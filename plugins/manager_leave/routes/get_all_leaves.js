'use strict';
const {leaveHandler} = require('../../hr_leave/handlers/get_all_leaves');


module.exports = {
    method: 'GET',
    path: '/manager/leave',
    handler: leaveHandler,
    options: {
        auth: false
    },
};