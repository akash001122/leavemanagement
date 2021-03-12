'use strict';

const leaveHandler = async (request,h) => {
    try {
            const {prisma} = request.server.app;
            const userId = request.auth.credentials.userId;
            const managerDepartmentId = await request.server.methods.getDeptId(userId)
            const leaveId = request.params.leaveId
            const {leaveStatus} = request.payload;
            const createLeave = await prisma.$queryRaw`UPDATE public.leave SET leavestatus= ${leaveStatus}, leaveupdatedtime = ${Date.now()} WHERE id = ${leaveId} AND departmentid = ${managerDepartmentId};`;
            return {
                statusCode: 201,
                message: `LEAVE ${leaveStatus}`,
                data: {
                    leaveId,
                    leaveType:createLeave.leaveType,
                    from: createLeave.startDate,
                    to: createLeave.endDate            
                }
            }
    } catch (e) {
        throw e
    }    

}
exports.leaveHandler = leaveHandler;