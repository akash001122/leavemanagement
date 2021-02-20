'use strict';
const {employeeHandler} = require('../handlers/get_all_emp');


module.exports = {
    method: 'GET',
    path: '/employees',
    handler: employeeHandler,
    options:{
        auth: 'jwt',
    }
};