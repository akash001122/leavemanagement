'use strict';

const leaveHandler = async (request, h) => {
  try {
    const userId = request.auth.credentials.userId;
    const managerDepartmentId = await request.server.methods.getDeptIdByUserId(userId);
    const employeeId = request.query.employeeId;
    const leaveDetail = await request.server.methods.get_emp_leave_by_empId_and_deptId(employeeId, managerDepartmentId);
    return {
      statusCode: 200,
      message: 'Leave Details fetched Successfully',
      data: {
        leavehistory: {leaveDetail},
      },
    };
  } catch (e) {
    throw e;
  }
};
exports.leaveHandler = leaveHandler;
