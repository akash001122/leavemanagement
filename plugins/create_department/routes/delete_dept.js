'use strict';
const {deptHandler} = require('../handlers/delete_dept');
const {deptValidation} = require('../validations/create_dept');


module.exports = {
    method: 'DELETE',
    path: '/department/{name}',
    handler: deptHandler,
    options:{
        auth: 'jwt',
        validate: {
            params: deptValidation
        }
    }
};