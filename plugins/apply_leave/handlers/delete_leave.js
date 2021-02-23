'use strict';
const { promisify } = require("util");
const redis = require("redis");
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
client.on("error", function(error) {
    console.error(error);
  });

const leaveHandler = async (request,h) => {
    
    try{
        const {prisma} = request.server.app;
        const {tokenId} = request.auth.credentials;
        const tokenDetails = await getAsync(tokenId);
        const det = JSON.parse(tokenDetails);
        const valid = false;

        const leaveDetail = await prisma.$queryRaw`SELECT * FROM public.leave WHERE employeeid = ${det.empId} AND valid = true ORDER BY id;`;
        await prisma.$queryRaw`UPDATE public.leave SET valid=${valid} WHERE id = ${leaveDetail[0].id};`;
        return {
            statusCode: 204,
            message: "Leave Deleted Successfully",
            data: {
                leavehistory: leaveDetail[0],
                jwt: tokenId
            }
        }
    
    }catch(e){
        throw e;
    }
}
exports.leaveHandler = leaveHandler;