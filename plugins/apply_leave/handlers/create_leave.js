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
        const {tokenId} = request.auth.credentials;
        const tokenDetails = await getAsync(tokenId);
        const det = JSON.parse(tokenDetails);
        if(det.isValid === true){
            const {leaveType,leaveDescription} = request.payload;
            const startDate = new Date(request.payload.startDate);
            const endDate = new Date(request.payload.endDate)
            const {prisma} = request.server.app;
            const createLeave = await prisma.$queryRaw`INSERT INTO public.leave (employeeid, leavetype, startdate, enddate, leavedescription) VALUES (${det.empId},${leaveType},${startDate},${endDate},${leaveDescription}) RETURNING *;`;
            return {
                statusCode: 201,
                message: "Leave Applied",
                data: {
                    id: createLeave[0].id,
                    empId: det.empId,
                    leaveType:createLeave[0].leavetype,
                    from: createLeave[0].startdate,
                    to: createLeave[0].enddate,
                    leaveDescription,
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
