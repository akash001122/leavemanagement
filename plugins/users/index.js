'use strict';

exports.employeePlugin = {
  name: 'Employee',
  register: async (server, options) => {
    try {
      // Methods
      server.method(require('./methods/get_user_by_username'));
      // Routes
      server.route(require('./routes/create_user'));
      server.route(require('./routes/delete_user'));
      server.route(require('./routes/edit_user'));
      server.route(require('./routes/get_all_users'));
      server.route(require('./routes/get_user_by_id'));
      server.route(require('./routes/reset_password'));
    } catch (e) {
      throw e;
    }
  },
};
