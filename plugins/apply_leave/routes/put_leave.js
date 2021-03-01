'use strict';
const {leaveHandler} = require('../handlers/put_leave');
const {leaveDetailValidator} = require('../validations/create_leave');



module.exports = {
    method: 'PUT',
    path: '/leave',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        description: 'Update Leave',
        notes: 'Updates the leave already applied by the  employeeid passed in jwt',
        tags: ['api'],
        validate: {
            payload: leaveDetailValidator,
        }
    },
};