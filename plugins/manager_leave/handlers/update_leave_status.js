'use strict';
const { promisify } = require("util");
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
        if(det.role === "MANAGER"){
            const {prisma} = request.server.app;
            const id = request.params.empId
            const {leaveStatus} = request.payload;
            const createLeave = await prisma.$queryRaw`UPDATE public.leave SET leavestatus= ${leaveStatus}, statustimestamp = ${Date.now()} WHERE id = (SELECT id FROM public.leave WHERE employeeid = ${id} AND valid = true AND leaveStatus != 'PENDING' AND leaveStatus != ${leaveStatus} order by id DESC FETCH FIRST ROW ONLY);`;
            return {
                statusCode: 201,
                message: `LEAVE ${leaveStatus}`,
                data: {
                    leaveType:createLeave.leaveType,
                    from: createLeave.startDate,
                    to: createLeave.endDate,
                    jwt: tokenId                }
            }
        }else{
            return Boom.unauthorized("Unauthorized")
        }  
    } catch (e) {
        throw e
    }    

}
exports.leaveHandler = leaveHandler;