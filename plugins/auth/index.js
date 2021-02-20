'use strict';

const jwt = require('jsonwebtoken');
const { promisify } = require("util");
const redis = require("redis");
const client = redis.createClient();
const JWT_ALGORITHM = require('../../config/config');
const JWT_SECRET = require('../../config/config');


const getAsync = promisify(client.get).bind(client);

client.on("error", function(error) {
    console.error(error);
  });


  const validate = async function (decoded) {
    console.log("hi")
    const userDetails = await getAsync(decoded)
    console.log(userDetails);
    if(!userDetails){
        return{isValid: false, errorMessage: "Invalid Token"};
    }else{
        return{
            isValid: true,
            credentials:{
                tokenId: decoded.id,
                userId: userDetails.userId,
                userName: userDetails.userName,
                role: userDetails.role
            }
        };
    }
}

exports.authPlugin = {
    name: 'auth',
    register: async (server, options) => {
        await server.register(require('hapi-auth-jwt2'))
        await server.auth.strategy('jwt', 'jwt', {
              key: JWT_SECRET,
              verifyOptions: { algorithms: ['HS256'] },
              validate
        });
        server.route(require('./routes/login'));
    } 
};

