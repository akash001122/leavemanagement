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
            const id = request.params.empId;
            const leaveDetail = await prisma.$queryRaw`SELECT e.firstname ||' '|| e.lastname AS name, d.name AS deptname, l.leavetype, l.startdate, l.enddate, l.leavedescription, l.leavetimestamp, l.leavestatus, l.statustimestamp, l.totalleavesleft  FROM public.employee e INNER JOIN public.leave l ON e.id = l.employeeid INNER JOIN department d ON e.depid = d.id WHERE e.depid = ${det.dept} AND e.id = ${id} ORDER BY l.id DESC;`;
            return {
                statusCode: 200,
                message: "Leave Details fetched Successfully",
                data: {
                    leavehistory: {leaveDetail},
                    jwt: tokenId
                }
            }
        }else{
            return Boom.unauthorized("Unauthorized")
        }  


    } catch (e) {
        throw e;
    }    

}
exports.leaveHandler = leaveHandler;