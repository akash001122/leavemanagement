'use strict';

const leaveHandler = async (request,h) => {
    
    const {prisma} = request.server.app;
    const {id} = request.params.empId;

    
    const leaveDetail = await prisma.$queryRaw`SELECT * FROM public."Leave" WHERE "employeeId" = ${id};`;
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