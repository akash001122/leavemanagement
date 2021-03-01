'use strict';
const {deptHandler} = require('../handlers/delete_dept');
const {deptValidation} = require('../validations/create_dept');


module.exports = {
    method: 'DELETE',
    path: '/department/{name}',
    handler: deptHandler,
    options:{
        auth: 'jwt',
        description: 'Delete department',
        notes: 'Updates department so that its visibility is inactive which can be done only by hr',
        tags: ['api'],
        validate: {
            params: deptValidation
        }
    }
};