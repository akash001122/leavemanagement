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
        const leaveId = request.params.leaveId;
        const getLeave = await prisma.$queryRaw`SELECT * FROM public.leave WHERE id = ${leaveId}`;
        const leaveType = request.payload.leaveType ? request.payload.leaveType : getLeave[0].leavetype;
        const startDate = new Date(request.payload.startDate ? request.payload.startDate : getLeave[0].startdate);
        const endDate = new Date(request.payload.endDate ? request.payload.endDate : getLeave[0].enddate);
        const leaveDescription = request.payload.leaveDescription ? request.payload.leaveDescription : getLeave[0].leavedescription;
        const {tokenId} = request.auth.credentials;
        const tokenDetails = await getAsync(tokenId);
        const det = JSON.parse(tokenDetails);
        if(det.isValid){
            if(getLeave[0].leavestatus ==="PENDING"){
                const updateLeave = await prisma.$queryRaw`UPDATE public.leave SET leavetype = ${leaveType},startdate = ${startDate}, enddate = ${endDate}, leavedescription = ${leaveDescription} WHERE id = ${leaveId} AND employeeid = ${det.empId};`;
                return {
                    statusCode: 201,
                    message: "Leave Updated",
                    data: {
                        leaveId,
                        empId: det.empId,
                        leaveType: leaveType,
                        from: startDate,
                        to: endDate,
                        leaveDescription,
                        jwt: tokenId
                    }
                }
            }else{
                return{
                    statusCode: 403,
                    message: "Cannot Update the Leave Which is Approved or Rejected"
                }
            }
        }else{
            return Boom.unauthorized("Unauthorized");
        }

        
    }catch(e){
        throw e;
    }
}
exports.leaveHandler = leaveHandler;