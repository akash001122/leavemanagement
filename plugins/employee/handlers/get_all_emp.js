'use strict';
const { promisify } = require("util");
const redis = require("redis");
const Boom  = require("@hapi/boom");
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
        const {prisma} = request.server.app;
        if(det.role === "HR" && det.isValid){
             var empDetail = await prisma.$queryRaw`SELECT * FROM public.employee WHERE valid = true;`;
             return {
                statusCode: 200,
                message: "Employee Details fetched Successfully",
                data: {
                    employee: {empDetail},
                    jwt: request.auth.credentials
                }
            }
        }else if (det.role === "MANAGER" && det.isValid){
             var empDetail = await prisma.$queryRaw`SELECT * FROM public.employee WHERE valid = true AND depid = ${det.dept};`;
             return {
                statusCode: 200,
                message: "Employee Details fetched Successfully",
                data: {
                    employee: empDetail,
                    jwt: request.auth.credentials,
                    jwt: tokenId
                }
            }
        }
        else{
            return Boom.unauthorized("Unauthorized")
        }
    }catch(e){
        throw e;
    }
}

exports.employeeHandler = employeeHandler;