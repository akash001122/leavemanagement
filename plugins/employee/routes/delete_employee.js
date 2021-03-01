'use strict';

const {employeeDetailValidator} = require('../validations/get_emp');
const {employeeHandler} = require('../handlers/delete_emp');


module.exports = {
    method: 'DELETE',
    path: '/employee/{empId}',
    handler: employeeHandler,
     options: {
         auth: 'jwt',
         description: 'Delete Employee',
         notes: 'Updates valid column of employee so that it the row becomes inactive, which can be done only by hr',
         tags: ['api'],
         validate: {
             params: employeeDetailValidator,
         }
     },
};