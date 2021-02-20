'use strict';
const {leaveHandler} = require('../handlers/get_leave');


module.exports = {
    method: 'GET',
    path: '/leave',
    handler: leaveHandler,
    options: {
        auth: 'jwt'
    },
};