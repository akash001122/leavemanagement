'use strict';
const { promisify } = require("util");
const  Boom  = require("@hapi/boom");
const redis = require("redis");
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
client.on("error", function(error) {
    console.error(error);
  });
const bcrypt = require('bcrypt');

const employeeHandler = async (request,h) => {
    try{
        const {tokenId} = request.auth.credentials;
        const tokenDetails = await getAsync(tokenId);
        const det = JSON.parse(tokenDetails);
        if(det.role === "HR" && det.isValid){
            const {prisma} = request.server.app;
            const empId = request.params.empId;
            const password = request.payload.password;
            const hashPassword = await bcrypt.hash(password,10);
            await prisma.$queryRaw`UPDATE public.userlogin SET password = ${hashPassword} WHERE empid = ${empId};`;
            return {
                statusCode: 201,
                empId,
                message: `Employee password updated`,
                jwt: tokenId
            };
        }else{
            return Boom.unauthorized("Unauthorized")
        }  
    }catch(e){
        throw e;
    }
}
exports.employeeHandler = employeeHandler;




