'use strict';

const leaveHandler = async (request, h) => {
  try {
    const employeeId = request.query.employeeId;
    const leaveDetail = await request.server.methods.get_emp_leave_by_empId(employeeId);
    return {
      statusCode: 200,
      message: 'Leave Details fetched Successfully',
      data: {
        leavehistory: leaveDetail,
      },
    };
  } catch (e) {
    throw e;
  }
};
exports.leaveHandler = leaveHandler;
