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
        var {leaveType, startDate, endDate,leaveDescription} = request.payload;
        startDate = Date.parse(startDate);
        endDate = Date.parse(endDate);
        const leaveDetail = await prisma.$queryRaw`SELECT * FROM public.leave WHERE employeeid = ${det.empId} AND valid = true ORDER BY id;`;
        console.log(leaveDetail);
        const createLeave = await prisma.$queryRaw`UPDATE public.leave SET leavetype = ${leaveType}, startdate = ${startDate}, enddate = ${endDate}, leavedescription = ${leaveDescription} WHERE id = ${leaveDetail[0].id};`;
        return {
            statusCode: 200,
            message: "Leave Updated",
            data: {
                leaveType:createLeave.leaveType,
                from: createLeave.startDate,
                to: createLeave.endDate,
                jwt: tokenId
            }
        }
    }catch(e){
        throw e;
    }
}
exports.leaveHandler = leaveHandler;