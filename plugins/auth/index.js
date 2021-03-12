'use strict';

const jwt = require('jsonwebtoken');
const { promisify } = require("util");
const { JWT_ALGORITHM} = require('../../config/config');
const redis = require("redis");
const { JWT_SECRET } = require('../../config/config');
const client = redis.createClient();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const getAsync = promisify(client.get).bind(client);

client.on("error", function(error) {
    console.error(error);
  });
const validate = async function (decoded) {
    try {
        const userDetails = await getAsync(decoded.tokenId);
        const parsedUserDetails = JSON.parse(userDetails)
        const userId = parsedUserDetails.userId;
        if(parsedUserDetails && parsedUserDetails.isValid){
            const employeeDetails = await prisma.$queryRaw`SELECT e.id AS employeeid, e.departmentid, u.role FROM public.employee e INNER JOIN public.userlogin u ON u.id = e.userid WHERE e.userid = ${userId}`;
            const payload = {
                isValid: true,
                credentials:{
                    tokenId: decoded.tokenId,
                    userId,
                    role: employeeDetails[0].role
                }
            };
            return payload
        }else{
            return{
                isValid: false, 
                errorMessage: "Invalid Token"};
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
                  key: JWT_SECRET,
                  verifyOptions: { algorithms: [JWT_ALGORITHM] },
                  validate
            });
            server.route(require('./routes/login'));
            server.route(require('./routes/logout'));

    } 
};

