'use strict';

const Boom = require('@hapi/boom');

const leaveHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const deptId = request.params.deptId;
    const userId = request.auth.credentials.userId;
    const managerDepartmentId = await request.server.methods.getDeptIdByUserId(userId);
    if (role.includes('HR') || deptId === managerDepartmentId) {
      const leaveDetail = prisma.$queryRaw`SELECT l.id AS leaveid, e.firstname ||' '|| e.lastname AS name, d.name AS departmentName, l.leavetype, l.startdate, l.enddate, l.leavedescription, l.leavecreatedtime, l.leavestatus, l.leaveupdatedtime  FROM public.employee e INNER JOIN public.leave l ON e.id = l.employeeid INNER JOIN department d ON e.departmentid = d.id ORDER BY l.id DESC WHERE e.departmentid = ${deptId} AND l.visible = true;`;
      return {
        statusCode: 200,
        message: 'Leave Details fetched Successfully',
        data: {
          leavehistory: {leaveDetail},
        },
      };
    } else {
      return Boom.badRequest('Error fetching leave details');
    }
  } catch (e) {
    throw e;
  }
};
exports.leaveHandler = leaveHandler;
