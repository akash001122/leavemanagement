const {logoutHandler} = require('../handlers/logout_handler');


module.exports = {
    method: 'DELETE',
    path: '/logout',
    handler: logoutHandler,
    options: {
        auth: 'jwt',
        description: 'Logout',
        notes: 'Logout and invalidate the jwt',
        tags: ['api']
    },
};