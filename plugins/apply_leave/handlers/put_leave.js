'use strict';

const leaveHandler = async (request,h) => {
    
    const {prisma} = request.server.app;
    const {id} = request.auth.credentials.empId;
    const {leaveType, startDate, endDate,leaveDescription} = request.payload;
    
    const leaveDetail = await prisma.$queryRaw`SELECT * FROM public."Leave" WHERE "employeeId" = ${id};`;
    const createLeave = await prisma.$queryRaw`UPDATE public."Leave" SET ("leaveType" = ${leaveType}, "startDate" = ${startDate}, "endDate" = ${endDate}, "leaveDescription" = ${leaveDescription}) WHERE "id" = ${leaveDetail[0].id};`;
    return {
        statusCode: 201,
        message: "Leave Updated",
        data: {
            leaveType:createLeave.leaveType,
            from: createLeave.startDate,
            to: createLeave.endDate,
            jwt: jwtToken
        }
    }
}
exports.leaveHandler = leaveHandler;