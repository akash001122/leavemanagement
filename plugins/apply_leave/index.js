'use strict';

const {getEmployeeIdByLeaveId} = require('./methods/getEmployeeId');

exports.leavePlugin = {
  name: 'leave',
  register: async (server, options) => {
    try {
      server.auth.default('jwt');
      server.route(require('./routes/post_leave'));
      server.route(require('./routes/get_leave'));
      server.route(require('./routes/put_leave'));
      server.route(require('./routes/delete_leave'));
      server.route(require('./routes/get_all_leaves'));
      server.method('getEmployeeIdByLeaveId', getEmployeeIdByLeaveId);
    } catch (e) {
      throw e;
    }
  },
};
