'use strict';
const {leaveHandler} = require('../handlers/get_leave');


module.exports = {
    method: 'DELETE',
    path: '/leave',
    handler: leaveHandler,
    options: {
        auth: 'jwt'
    },
};