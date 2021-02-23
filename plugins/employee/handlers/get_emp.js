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
            var empDetail = await prisma.$queryRaw`SELECT * FROM public.employee WHERE id = ${empId} AND valid = true;`;
            await prisma.$disconnect();
            return h.response(empDetail).code(200);
        }else{
            return{
                Message: "Access Denied"
            }
        }
    }
    catch(e) {
        throw e
    }
}

exports.employeeHandler = employeeHandler;