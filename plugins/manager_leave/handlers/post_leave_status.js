'use strict';
const { promisify } = require("util");
const Boom  = require("@hapi/boom");
const redis = require("redis");
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
client.on("error", function(error) {
    console.error(error);
  });

const leaveHandler = async (request,h) => {
    try {
        const {tokenId} = request.auth.credentials;
        const tokenDetails = await getAsync(tokenId);
        const det = JSON.parse(tokenDetails);
        if(det.role === "MANAGER" && det.isValid){
            const {prisma} = request.server.app;
            const id = request.params.leaveId
            const {leaveStatus} = request.payload;
            const createLeave = await prisma.$queryRaw`UPDATE public.leave SET leavestatus= ${leaveStatus}, statustimestamp = ${Date.now()} WHERE id = ${id};`;
            return {
                statusCode: 201,
                message: `LEAVE ${leaveStatus}`,
                data: {
                    leaveId: id,
                    leaveType:createLeave.leaveType,
                    from: createLeave.startDate,
                    to: createLeave.endDate,
                    jwt: tokenId                }
            }
        }else{
            return Boom.unauthorized("Unauthorized")
        }  
    } catch (e) {
        throw e;
    }    

}
exports.leaveHandler = leaveHandler;