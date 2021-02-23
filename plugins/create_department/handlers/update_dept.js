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
            const newName = request.payload.name;
            const manager = request.payload.manager
            const name = request.params.name;
            await prisma.$queryRaw`UPDATE public.department SET name = ${newName},manager = ${manager} WHERE  name = ${name} AND visible = true;`;    
            return h.response().code(200);
        }else{
            return{
                Message: "Access Denied"
            }
        }

    }catch(e){
        throw e;
    }
}
exports.deptHandler = deptHandler;