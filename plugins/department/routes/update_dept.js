'use strict';
const {deptHandler} = require('../handlers/update_dept');
const  departmentIdValidator  = require('../validations/department_id');
const deptBodyValidation = require('../validations/departmentPayload.js');


module.exports = {
    method: 'PUT',
    path: '/department/{departmentId}',
    handler: deptHandler,
    options:{
        auth: 'jwt',
        description: 'Update department',
        notes: 'Updates department which can be done only by hr',
        tags: ['api'],
        validate:{
            payload: deptBodyValidation,
            params: departmentIdValidator
        },
        plugins: {
            'hapiAuthorization': {
                roles: ['HR']
            }
        }
    }
};