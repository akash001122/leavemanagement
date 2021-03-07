'use strict';
const {deptHandler} = require('../handlers/get_dept_by_id');
const {deptValidation} = require('../validations/create_dept');


module.exports = {
    method: 'GET',
    path: '/department/{id}',
    handler: deptHandler,
    options:{
        auth: 'jwt',
        description: 'Get department by id',
        notes: 'Fetches department details which can be done only by hr',
        tags: ['api'],
        validate:{
            params: deptValidation
        }
    }
};