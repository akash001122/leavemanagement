'use strict';

const  Boom  = require("@hapi/boom");

const leaveHandler = async (request,h) => {
    try {
            const {prisma} = request.server.app;
            const userId = request.auth.credentials.userId;
            const managerDepartmentId = await request.server.methods.getDeptId(userId)
            const leaveId = request.params.leaveId
            const {leaveStatus} = request.payload;
            const employeeId = await request.server.methods.getEmployeeIdByLeaveId(leaveId);
            const employeeUserId = await request.server.methods.getUserIdByEmployeeId(employeeId);
            const employeeDepartmentId = await request.server.methods.getDeptId(employeeUserId);
            if(managerDepartmentId === employeeDepartmentId){
                const createLeave = await prisma.$queryRaw`UPDATE public.leave SET leavestatus= ${leaveStatus}, leaveupdatedtime = ${Date.now()} WHERE id = ${leaveId};`;
                return {
                    statusCode: 201,
                    message: `LEAVE ${leaveStatus}`,
                    data: {
                        leaveId,
                        leaveType:createLeave.leaveType,
                        from: createLeave.startDate,
                        to: createLeave.endDate,
                    }
                }
            }else{
                return Boom.unauthorized();
            }
    } catch (e) {
        throw e;
    }    

}
exports.leaveHandler = leaveHandler;