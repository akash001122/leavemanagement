'use strict';
const {deptHandler} = require('../handlers/get_all_dept');


module.exports = {
    method: 'GET',
    path: '/department',
    options:{
        auth: 'jwt',
        description: 'Get all departments',
        notes: 'Fetches department details which can be done only by hr',
        tags: ['api'],
        plugins: {
            'hapiAuthorization': {
                roles: ['HR']
            }
        }
    },
    handler: deptHandler,
};