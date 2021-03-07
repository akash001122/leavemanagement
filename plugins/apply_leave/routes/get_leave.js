'use strict';
const {leaveHandler} = require('../handlers/get_leave');
const {leaveIdValidator} = require('../validations/put_leave');


module.exports = {
    method: 'GET',
    path: '/leave/{leaveId}',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        description: 'Get leave',
        notes: 'Returns the leaves applied by the employee whose leave id passed in params',
        tags: ['api'],
        validate: {
            params: leaveIdValidator
        }
    },
};