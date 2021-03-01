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

        const leaveDetail = await prisma.$queryRaw`;`;
        await prisma.$queryRaw`UPDATE public.leave SET valid=${valid} WHERE employeeid = ${det.empId} AND valid = true AND startdate > ${Date.now()} ORDER BY id DESC FETCH FIRST ROW ONLY;`;
        return {
            statusCode: 201,
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