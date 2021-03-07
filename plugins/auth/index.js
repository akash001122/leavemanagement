'use strict';

const jwt = require('jsonwebtoken');
//const getAsync = require('./helper_methods/get_token_details');
const { promisify } = require("util");
const redis = require("redis");
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

client.on("error", function(error) {
    console.error(error);
  });


  const validate = async function (decoded) {
    try {
        const userDetails = await getAsync(decoded.tokenId);
        if(!userDetails){
            return{
                statusCode: 401,
                isValid: false, 
                errorMessage: "Invalid Token"};
        }else{
            return{
                isValid: true,
                credentials:{
                    tokenId: decoded.tokenId,
                    userId: userDetails.userId,
                    userName: userDetails.userName,
                    role: userDetails.role
                }
            };
        }
    } catch (e) {
        throw e
    }
}

exports.authPlugin = {
    name: 'auth',
    register: async (server, options) => {
            await server.register(require('hapi-auth-jwt2'))
            await server.auth.strategy('jwt', 'jwt', {
                  key: 'classified',
                  verifyOptions: { algorithms: ['HS256'] },
                  validate
            });
            server.route(require('./routes/login'));
            server.route(require('./routes/logout'));

    } 
};

