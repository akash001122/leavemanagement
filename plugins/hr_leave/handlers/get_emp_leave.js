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
        if(det.role === "HR" || det.role ==="MANAGER"){
            const {prisma} = request.server.app;
            const id = request.params.empId;
            const leaveDetail = await prisma.$queryRaw`SELECT * FROM public.leave WHERE employeeid = ${id};`;
            return {
                statusCode: 200,
                message: "Leave Details fetched Successfully",
                data: {
                    leavehistory: {leaveDetail},
                    jwt: request.auth.credentials
                }
            }
        }else{
            return{
                Message: "Access Denied"
            }
        }  


    } catch (e) {
        throw e;
    }    

}
exports.leaveHandler = leaveHandler;