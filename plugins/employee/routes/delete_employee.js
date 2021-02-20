'use strict';

const {employeeDetailValidator} = require('../validations/get_emp');
const {employeeHandler} = require('../handlers/delete_emp');


module.exports = {
    method: 'DELETE',
    path: '/employee/{empId}',
    handler: employeeHandler,
     options: {
         auth: false,
         validate: {
             params: employeeDetailValidator,
         }
     },
};