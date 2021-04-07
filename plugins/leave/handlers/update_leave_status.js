'use strict';

const leaveHandler = async (request, h) => {
  try {
    const leaveId = request.params.leaveId;
    const {leaveStatus} = request.payload;
    const managerUserId = request.auth.credentials.userId;
    const {prisma} = request.server.app;
    // const managerDetails = await request.server.methods.get_employee_details_by_userId(managerUserId);

    const updateLeave = await prisma.$queryRaw`UPDATE public.leave as l SET leavestatus= ${leaveStatus} FROM public.employee as e INNER JOIN public.employee as me ON me.userid = ${managerUserId}  WHERE l.employeeid = e.id AND l.id = ${leaveId} AND e.id != me.id AND e.departmentid = me.departmentid RETURNING *;`;
    if (leaveStatus === 'APPROVED') {
      await request.server.methods.update_total_leaves_by_employeeId(updateLeave[0].employeeId);
    }
    return {
      statusCode: 201,
      message: `Leave Status Updated Successfully`,
      data: updateLeave,
    };
  } catch (e) {
    throw e;
  }
};
exports.leaveHandler = leaveHandler;
