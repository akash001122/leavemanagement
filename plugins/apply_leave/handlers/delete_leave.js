'use strict';

const leaveHandler = async (request,h) => {
    
    const {prisma} = request.server.app;
    const {id} = request.auth.credentials.empId;
    const valid = false;

    const leaveDetail = await prisma.$queryRaw`SELECT * FROM public."Leave" WHERE "employeeId" = ${id};`;
    const leaveDetail = await prisma.$queryRaw`UPDATE public."Leave SET ("valid"=${valid}) WHERE "id" = ${leaveDetail[0].id};`;
    return {
        statusCode: 201,
        message: "Leave Details fetched Successfully",
        data: {
            leavehistory: {leaveDetail},
            jwt: jwtToken
        }
    }
}
exports.leaveHandler = leaveHandler;