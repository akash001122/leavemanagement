'use strict';
const {deptHandler} = require('../handlers/update_dept');
const {deptBodyValidation,deptValidation} = require('../validations/create_dept');


module.exports = {
    method: 'PUT',
    path: '/department/{id}',
    handler: deptHandler,
    options:{
        auth: 'jwt',
        description: 'Update department',
        notes: 'Updates department which can be done only by hr',
        tags: ['api'],
        validate:{
            payload: deptBodyValidation,
            params: deptValidation
        }
    }
};