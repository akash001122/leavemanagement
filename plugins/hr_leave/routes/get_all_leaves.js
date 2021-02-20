'use strict';
const {leaveHandler} = require('../handlers/get_all_leaves');


module.exports = {
    method: 'GET',
    path: '/hr/leave',
    handler: leaveHandler,
    options: {
        auth: false
    },
};