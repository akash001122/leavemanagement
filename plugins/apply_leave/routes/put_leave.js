'use strict';
const {leaveHandler} = require('../handlers/put_leave');
const {leaveDetailValidator} = require('../validations/put_leave');
const {leaveIdValidator} = require('../validations/put_leave');




module.exports = {
    method: 'PUT',
    path: '/leave/{leaveId}',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        description: 'Update Leave',
        notes: 'Updates the leave already applied by the leave id passed in params',
        tags: ['api'],
        validate: {
            payload: leaveDetailValidator,
            params: leaveIdValidator
        }
    },
};