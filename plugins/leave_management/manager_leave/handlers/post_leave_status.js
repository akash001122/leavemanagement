'use strict';

const Boom = require('@hapi/boom');

const leaveHandler = async (request, h) => {
  try {
    const leaveId = request.params.leaveId;
    const {leaveStatus} = request.payload;
    const managerUserId = request.auth.credentials.userId;
    const managerEmployeeId = await request.server.methods.getEmployeeIdByUserId(managerUserId);
    const employeeId = await request.server.methods.getEmployeeIdByLeaveId(leaveId);
    if (managerEmployeeId !== employeeId) {
      const managerDepartmentId = await request.server.methods.getDeptIdByUserId(managerUserId);
      const employeeDepartmentId = await request.server.methods.getDeptIdByEmployeeId(employeeId);
      if (managerDepartmentId === employeeDepartmentId) {
        const createLeave = request.server.methods.update_leave_status_by_leaveId(leaveId, leaveStatus);
        if (leaveStatus === 'APPROVED') {
          await request.server.methods.update_total_leaves_by_employeeId(employeeId);
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
