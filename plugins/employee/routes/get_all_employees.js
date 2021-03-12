'use strict';
const {employeeHandler} = require('../handlers/get_all_emp');


module.exports = {
    method: 'GET',
    path: '/employees',
    handler: employeeHandler,
    options:{
        auth: 'jwt',
        description: 'Get All Employees',
        notes: 'Fetch all employees details which can be done only by hr',
        tags: ['api'],
        plugins: {
            'hapiAuthorization': {
                roles: ['HR','MANAGER']
            }
        }
    }

};