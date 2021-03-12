'use strict';
const  { getEmployeeIdByUserId } = require('./methods/getEmployeeId');
const { getUserIdByEmployeeId } = require('./methods/getUserId');

exports.employeePlugin = {
    name: 'Employee',
    register: async (server,options) =>{
        try {
            server.route(require('./routes/post_employee'));
            server.route(require('./routes/get_employee'));
            server.route(require('./routes/put_employee'));
            server.route(require('./routes/delete_employee'));
            server.route(require('./routes/get_all_employees'));
            server.route(require('./routes/get_emp_by_dept'));
            server.route(require('./routes/reset_password'));
            server.method('getEmployeeIdByUserId',getEmployeeIdByUserId);
            server.method('getUserIdByEmployeeId',getUserIdByEmployeeId);
        } catch (e) {
            throw e;
        }
    }
}
