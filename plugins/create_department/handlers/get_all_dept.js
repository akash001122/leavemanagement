'use strict';
const { promisify } = require("util");
const Boom  = require("@hapi/boom");
const redis = require("redis");
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
client.on("error", function(error) {
    console.error(error);
  });

const deptHandler = async (request,h) => {
    try{
        const {tokenId} = request.auth.credentials;
        const tokenDetails = await getAsync(tokenId);
        const det = JSON.parse(tokenDetails);
        if(det.role === "HR" && det.isValid === true){
            const {prisma} = request.server.app;
            const id = request.params.id;
            const department = await prisma.$queryRaw`SELECT * FROM public.department;`;    
            return {
                statusCode: 200,
                message: `Departments Fetched Successfully`,
                data: {department},
                jwt: tokenId
            }
            
        }else{
            return Boom.unauthorized("Unauthorized");
        }

    }catch(e){
        throw e;
    }
}
exports.deptHandler = deptHandler;