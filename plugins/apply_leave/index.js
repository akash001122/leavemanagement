'use strict';

const {getEmployeeIdByLeaveId} = require('./methods/getEmployeeId');

exports.leavePlugin = {
  name: 'leave',
  register: async (server, options) => {
    try {
      server.auth.default('jwt');
      // Routes
      server.route(require('./routes/post_leave'));
      server.route(require('./routes/get_leave'));
      server.route(require('./routes/put_leave'));
      server.route(require('./routes/delete_leave'));
      server.route(require('./routes/get_all_leaves'));
      // Methods
      server.method('getEmployeeIdByLeaveId', getEmployeeIdByLeaveId);
      server.method(require('./methods/get_all_leaves'));
      server.method(require('./methods/get_all_leaves_by_deptId'));
      server.method(require('./methods/get_emp_leave_by_empId'));
      server.method(require('./methods/get_emp_leave_by_empId_and_deptId'));
      server.method(require('./methods/update_leave_status_by_leaveId'));
    } catch (e) {
      throw e;
    }
  },
};
