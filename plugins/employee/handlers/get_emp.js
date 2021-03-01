'use strict';
const { promisify } = require("util");
const redis = require("redis");
const { Boom } = require("@hapi/boom");
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
            var empDetail = await prisma.$queryRaw`SELECT * FROM public.employee WHERE id = ${empId} AND valid = true;`;
            await prisma.$disconnect();
            return h.response(empDetail).code(200);
        }else if (det.role === "MANAGER"){
            var empDetail = await prisma.$queryRaw`SELECT * FROM public.employee WHERE id = ${empId} AND valid = true AND depid = ${det.dept};`;
            return {
               statusCode: 200,
               message: "Employee Details fetched Successfully",
               data: {
                   employee: empDetail,
                   jwt: request.auth.credentials,
                   jwt: tokenId
               }
           }
        }else{
            return Boom.unauthorized("Unauthorized")
        }
    }
    catch(e) {
        throw e
    }
}

exports.employeeHandler = employeeHandler;