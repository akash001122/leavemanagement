'use strict';
const {deptHandler} = require('../handlers/update_dept');
const {deptBodyValidation,deptValidation} = require('../validations/create_dept');


module.exports = {
    method: 'PUT',
    path: '/department/{name}',
    handler: deptHandler,
    options:{
        auth: 'jwt',
        validate:{
            payload: deptBodyValidation,
            params: deptValidation
        }
    }
};