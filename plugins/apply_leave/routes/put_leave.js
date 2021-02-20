'use strict';
const {leaveHandler} = require('../handlers/put_leave');
const {leaveDetailValidator} = require('../validations/create_leave');



module.exports = {
    method: 'PUT',
    path: '/leave',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        validate: {
            payload: leaveDetailValidator,
        }
    },
};