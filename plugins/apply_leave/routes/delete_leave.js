'use strict';
const {leaveHandler} = require('../handlers/delete_leave');
const leaveIdValidator = require('../validations/leaveId');


module.exports = {
    method: 'DELETE',
    path: '/leave/{leaveId}',
    handler: leaveHandler,
    options: {
        auth: 'jwt',
        description: 'Delete leave',
        notes: 'Updates the valid column of leave whose leave id is passed in params of an employee to false ',
        tags: ['api'],
        validate: {
            params: leaveIdValidator
        },
        plugins: {
            'hapiAuthorization': {
                roles: ['HR', 'MANAGER','EMPLOYEE']
            }
        }
    }
};