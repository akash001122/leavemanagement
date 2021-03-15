'use strict';

const {getDeptIdByUserId} = require('./methods/get_deptId_by_userId');
const {getDeptIdByEmployeeId} = require('./methods/get_deptId_by_employeeId');

exports.departmentPlugin = {
  name: 'Department',
  register: async (server, options) => {
    try {
      server.route(require('./routes/create_dept'));
      server.route(require('./routes/update_dept'));
      server.route(require('./routes/delete_dept'));
      server.route(require('./routes/get_dept_by_id'));
      server.route(require('./routes/get_all_dept'));
      server.method('getDeptIdByUserId', getDeptIdByUserId);
      server.method('getDeptIdByEmployeeId', getDeptIdByEmployeeId);
    } catch (e) {
      throw e;
    }
  },
};
