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
        if(det.role === "HR" && det.isValid){
            const {prisma} = request.server.app;
            const id = request.params.id;
            const depDetails = await prisma.$queryRaw`SELECT * FROM public.department WHERE id = ${id};`;
            const newName = request.payload.name ? request.payload.name : depDetails[0].name;
            const visibility = request.payload.visible !== undefined? request.payload.visible : depDetails[0].visible;
            await prisma.$queryRaw`UPDATE public.department SET name = ${newName}, visible = ${visibility} WHERE  id = ${id};`;    
            return {
                statusCode: 201,
                depId: id,
                visibility: visibility,
                message: `${newName} Department updated`,
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