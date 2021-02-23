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
            var empDetail
            empDetail = await prisma.$queryRaw`SELECT * FROM public.employee WHERE valid = true;`;
            return h.response(empDetail).code(200);
        }else{
            return{
                Message: "Access Denied"
            }
        }
    }catch(e){
        throw e;
    }
}

exports.employeeHandler = employeeHandler;