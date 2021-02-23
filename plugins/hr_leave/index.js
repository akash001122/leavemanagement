'use strict';

exports.hrPlugin = {
    name: 'HR',
    register: async (server,options) =>{
        try {
            server.route(require('./routes/get_all_leaves'));
            server.route(require('./routes/get_emp_leave'));
        } catch (e) {
            throw e;
        }
    }
}
