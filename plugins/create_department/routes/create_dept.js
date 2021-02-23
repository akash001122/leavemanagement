'use strict';
const {deptHandler} = require('../handlers/create_dept');
const {deptBodyValidation} = require('../validations/create_dept');


module.exports = {
    method: 'POST',
    path: '/department',
    handler: deptHandler,
    options:{
        auth: 'jwt',
        validate:{
            payload: deptBodyValidation
        }
    }
};