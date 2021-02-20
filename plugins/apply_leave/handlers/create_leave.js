'use strict';

const leaveHandler = async (request,h) => {
    
    const {prisma} = request.server.app;
    const {id} = request.auth.credentials.empId;
    const {leaveType, startDate, endDate,leaveDescription} = request.payload;

    
    const createLeave = await prisma.$queryRaw`INSERT INTO public."Leave"("employeeId", "leaveType", "startDate", "endDate", "leaveDescription") VALUES (${id},${leaveType},${startDate},${endDate},${leaveDescription}) RETURNING *;`;    
    return {
        statusCode: 201,
        message: "Leave Applied",
        data: {
            leaveType:createLeave.leaveType,
            from: createLeave.startDate,
            to: createLeave.endDate,
            jwt: jwtToken
        }
    }
}
exports.leaveHandler = leaveHandler;