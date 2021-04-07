'use strict';
const {getEmployeeIdByUserId} = require('./methods/getEmployeeId');
const {getUserIdByEmployeeId} = require('./methods/getUserId');

exports.employeePlugin = {
  name: 'Employee',
  register: async (server, options) => {
    try {
      // Routes
      server.route(require('./routes/post_employee'));
      server.route(require('./routes/get_employee'));
      server.route(require('./routes/put_employee'));
      server.route(require('./routes/delete_employee'));
      server.route(require('./routes/get_all_employees'));
      server.route(require('./routes/get_emp_by_dept'));
      // Methods
      server.method('getEmployeeIdByUserId', getEmployeeIdByUserId);
      server.method('getUserIdByEmployeeId', getUserIdByEmployeeId);
      server.method(require('./methods/update_total_leaves_by_employeeId'));
      server.method(require('./methods/get_employee_details_by_userId'));
    } catch (e) {
      throw e;
    }
  },
};
