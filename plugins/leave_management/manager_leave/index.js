'use strict';

exports.managerPlugin = {
    name: 'Manager',
    register: async (server,options) =>{
        try {
            server.route(require('./routes/get_all_leaves'));
            server.route(require('./routes/get_emp_leave'));
            server.route(require('./routes/post_leave_status'));
            server.route(require('./routes/update_leave_status'));
        } catch (e) {
            throw e;
        }
    }
}
