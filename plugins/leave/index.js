'use strict';

const {getEmployeeIdByLeaveId} = require('./methods/getEmployeeId');

exports.leavePlugin = {
  name: 'leave',
  register: async (server, options) => {
    try {
      server.auth.default('jwt');
      // Routes
      server.route(require('./routes/create_leave'));
      server.route(require('./routes/get_my_leave'));
      server.route(require('./routes/edit_my_leave'));
      server.route(require('./routes/delete_leave'));
      server.route(require('./routes/get_my_leaves'));
      server.route(require('./routes/get_all_leaves'));
      server.route(require('./routes/get_emp_leave'));
      server.route(require('./routes/get_leaves_by_deptId'));
      server.route(require('./routes/update_leave_status'));
      // Methods
      server.method('getEmployeeIdByLeaveId', getEmployeeIdByLeaveId);
    } catch (e) {
      throw e;
    }
  },
};
