'use strict';
const {leaveDetailValidator} = require('../validations/create_leave');
const {leaveHandler} = require('../handlers/create_leave');


module.exports = {
    method: 'POST',
    path: '/leave',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        validate: {
            payload: leaveDetailValidator,
        }
    },
};