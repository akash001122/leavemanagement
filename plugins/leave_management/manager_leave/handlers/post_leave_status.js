'use strict';

const Boom = require('@hapi/boom');

const leaveHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const leaveId = request.params.leaveId;
    const {leaveStatus} = request.payload;
    const managerUserId = request.auth.credentials.userId;
    const managerEmployeeId = await request.server.methods.getEmployeeIdByUserId(managerUserId);
    const employeeId = await request.server.methods.getEmployeeIdByLeaveId(leaveId);
    if (managerEmployeeId !== employeeId) {
      const managerDepartmentId = await request.server.methods.getDeptIdByUserId(managerUserId);
      const employeeDepartmentId = await request.server.methods.getDeptIdByEmployeeId(employeeId);
      if (managerDepartmentId === employeeDepartmentId) {
        let createLeave;
        if (leaveStatus === 'APPROVED') {
          createLeave = await prisma.$queryRaw`UPDATE public.leave SET leavestatus= ${leaveStatus}, leaveupdatedtime = ${Date.now()}, totalleavesleft = totalleavesleft - 1 WHERE id = ${leaveId};`;
        } else {
          createLeave = await prisma.$queryRaw`UPDATE public.leave SET leavestatus= ${leaveStatus}, leaveupdatedtime = ${Date.now()} WHERE id = ${leaveId};`;
        }
        return {
          statusCode: 201,
          message: `LEAVE ${leaveStatus}`,
          data: {
            leaveId,
            leaveType: createLeave.leaveType,
            from: createLeave.startDate,
            to: createLeave.endDate,
          },
        };
      }
    } else {
      return Boom.unauthorized();
    }
  } catch (e) {
    throw e;
  }
};
exports.leaveHandler = leaveHandler;
