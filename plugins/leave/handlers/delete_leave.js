'use strict';

const leaveHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const userId = request.auth.credentials.userId;
    const employeeId = await request.server.methods.getEmployeeIdByUserId(userId);
    const leaveId = request.params.leaveId;
    await prisma.$queryRaw`UPDATE public.leave SET visible = false WHERE id = ${leaveId} AND employeeId = ${employeeId} ;`;
    return {
      statusCode: 201,
      message: 'Leave Deleted Successfully',
      data: {
        leaveId,
        employeeId,
      },
    };
  } catch (e) {
    throw e;
  }
};
exports.leaveHandler = leaveHandler;
