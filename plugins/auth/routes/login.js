const {loginHandler} = require('../handlers/login_handler');
const {loginValidation} = require('../validations/login_validation');


module.exports = {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
    options: {
        auth: false,
        validate: {
            payload: loginValidation,
        }
    },
};