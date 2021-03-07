'use strict';
const { promisify } = require("util");
const redis = require("redis");
const Boom  = require("@hapi/boom");
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
        if(det.isValid === true){
            const valid = false;
            const leaveId = request.params.leaveId;
            await prisma.$queryRaw`UPDATE public.leave SET valid=${valid} WHERE id = ${leaveId} AND employeeId = ${det.empId} ;`;
            return {
                statusCode: 201,
                message: "Leave Deleted Successfully",
                data: {
                    id: leaveId,
                    empId: det.empId,
                    jwt: tokenId
                }
            }    
        }else{
            return Boom.unauthorized("Unauthorized")
        }

    }catch(e){
        throw e;
    }
}
exports.leaveHandler = leaveHandler;