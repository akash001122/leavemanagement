'use strict';

exports.employeePlugin = {
    name: 'Employee',
    register: async (server,options) =>{
        server.route(require('./routes/post_employee'));
        server.route(require('./routes/get_employee'));
        server.route(require('./routes/put_employee'));
        server.route(require('./routes/delete_employee'));
        server.route(require('./routes/get_all_employees'));
    }
}
