'use strict';
const { promisify } = require("util");
const redis = require("redis");
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
client.on("error", function(error) {
    console.error(error);
  });

const employeeHandler = async (request,h)=>{
    try{
        const {tokenId} = request.auth.credentials;
        const tokenDetails = await getAsync(tokenId);
        const det = JSON.parse(tokenDetails);
        if(det.role === "HR"){
            const {prisma} = request.server.app;
            const empId = request.params.empId;    
            const valid = false
            await prisma.$queryRaw`UPDATE public.employee SET valid = ${valid} WHERE id = ${empId};`;
            return {
                statusCode: 201,
                message: `Employee deleted`,
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

