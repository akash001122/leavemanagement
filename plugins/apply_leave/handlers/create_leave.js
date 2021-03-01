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
        const {tokenId} = request.auth.credentials;
        const tokenDetails = await getAsync(tokenId);
        const det = JSON.parse(tokenDetails);
    
        var {leaveType, startDate, endDate,leaveDescription} = request.payload;
        const {prisma} = request.server.app;
        startDate = Date.parse(startDate);
        endDate = Date.parse(endDate);
        console.log("hello")
        const createLeave = await prisma.$queryRaw`INSERT INTO public.leave (employeeid, leavetype, startdate, enddate, leavedescription) VALUES (${det.empId},${leaveType},${startDate},${endDate},${leaveDescription}) RETURNING *;`;
        console.log(createLeave)
        return {
            statusCode: 201,
            message: "Leave Applied",
            data: {
                leaveType:createLeave[0].leavetype,
                from: createLeave[0].startdate,
                to: createLeave[0].enddate,
                jwt: tokenId
            }
        }
    }catch(e){
        throw e;
    }
}
exports.leaveHandler = leaveHandler;
