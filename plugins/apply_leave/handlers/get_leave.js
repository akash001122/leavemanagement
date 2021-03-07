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
        const leaveId = request.params.leaveId;
        const {prisma} = request.server.app;
        const tokenDetails = await getAsync(tokenId);
        const det = JSON.parse(tokenDetails);
        if(det.isValid){
            const leaveDetail = await prisma.$queryRaw`SELECT l.id, e.firstname ||' '|| e.lastname AS name, d.name AS deptname, l.leavetype, l.startdate, l.enddate, l.leavedescription, l.leavetimestamp, l.leavestatus, l.statustimestamp, l.totalleavesleft  FROM public.employee e INNER JOIN public.leave l ON e.id = l.employeeid INNER JOIN department d ON e.depid = d.id WHERE l.id = ${leaveId} AND l.valid = true AND l.employeeid = ${det.empId};`;
            return {
                statusCode: 200,
                message: "Leave Details fetched Successfully",
                data: {
                    empId: det.empId,
                    leavehistory: {leaveDetail},
                    jwt: tokenId
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