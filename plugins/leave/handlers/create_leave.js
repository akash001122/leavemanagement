'use strict';

const leaveHandler = async (request, h) => {
  try {
    const userId = request.auth.credentials.userId;
    const employeeId = await request.server.methods.getEmployeeIdByUserId(userId);
    const {leaveType, leaveDescription} = request.payload;
    const startDate = new Date(request.payload.startDate);
    const endDate = new Date(request.payload.endDate);
    const {prisma} = request.server.app;
    const createLeave = await prisma.$queryRaw`INSERT INTO public.leave (employeeid, leavetype, startdate, enddate, leavedescription) VALUES (${employeeId},${leaveType},${startDate},${endDate},${leaveDescription}) RETURNING *;`;
    return {
      statusCode: 201,
      message: 'Leave Applied',
      data: {
        leaveId: createLeave[0].id,
        employeeId,
        leaveType: createLeave[0].leavetype,
        from: createLeave[0].startdate,
        to: createLeave[0].enddate,
        leaveDescription,
      },
    };
  } catch (e) {
    throw e;
  }
};
exports.leaveHandler = leaveHandler;
