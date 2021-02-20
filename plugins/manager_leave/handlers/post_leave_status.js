'use strict';

const leaveHandler = async (request,h) => {
    
    const {prisma} = request.server.app;
    const {id} = request.auth.credentials.empId;
    const {leaveStatus} = request.payload;
    
    const leaveDetail = await prisma.$queryRaw`SELECT * FROM public."Leave" WHERE "employeeId" = ${id};`;
    const createLeave = await prisma.$queryRaw`UPDATE public."Leave" SET "leaveStatus"= ${leaveStatus} WHERE "id" = ${leaveDetail[0].id};`;
    return {
        statusCode: 201,
        message: `LEAVE ${leaveStatus}`,
        data: {
            leaveType:createLeave.leaveType,
            from: createLeave.startDate,
            to: createLeave.endDate,
            jwt: jwtToken
        }
    }
}
exports.leaveHandler = leaveHandler;