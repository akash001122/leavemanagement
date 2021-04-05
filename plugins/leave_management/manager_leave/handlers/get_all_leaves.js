'use strict';

const leaveHandler = async (request, h) => {
  try {
    const userId = request.auth.credentials.userId;
    const managerDepartmentId = await request.server.methods.getDeptIdByUserId(userId);
    const leaveDetail = await request.server.methods.get_all_leaves_by_deptId(managerDepartmentId);
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
