'use strict';

exports.leavePlugin = {
    name: 'Emp',
    register: async (server,options) =>{
        server.auth.default('jwt');
        server.route(require('./routes/post_leave'));
        server.route(require('./routes/get_leave'));
        server.route(require('./routes/put_leave'));
        server.route(require('./routes/delete_leave'));
    }
}
