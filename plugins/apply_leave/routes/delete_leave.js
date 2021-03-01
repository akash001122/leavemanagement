'use strict';
const {leaveHandler} = require('../handlers/delete_leave');


module.exports = {
    method: 'DELETE',
    path: '/leave',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        description: 'Delete leave',
        notes: 'Updates the valid column of leave of an employee to false',
        tags: ['api'],
    },
};