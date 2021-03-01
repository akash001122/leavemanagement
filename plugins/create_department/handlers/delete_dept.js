'use strict';
const { promisify } = require("util");
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
        if(det.role === "HR"){
            const {prisma} = request.server.app;
            const name = request.params.name;
            await prisma.$queryRaw`UPDATE public.department SET visible = false WHERE name = ${name};`;    
            return {
                statusCode: 201,
                message: `${name} Department deleted`,
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