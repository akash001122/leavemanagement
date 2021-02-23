'use strict';
const {leaveHandler} = require('../handlers/delete_leave');


module.exports = {
    method: 'DELETE',
    path: '/leave',
    handler: leaveHandler,
    options: {
        auth: 'jwt'
    },
};