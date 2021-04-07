'use strict';

const leaveHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const {userId, role} = request.auth.credentials;
    const employeeId = request.query.employeeId;
    if (role.includes('HR')) {
      const leaveDetail = await prisma.$queryRaw`SELECT l.id AS leaveid, e.id AS employeeid, e.firstname ||' '|| e.lastname AS name, d.name AS departmenttname, l.leavetype, l.startdate, l.enddate, l.leavedescription, l.leavecreatedtime, l.leavestatus, l.leaveupdatedtime FROM public.employee e INNER JOIN public.leave l ON e.id = l.employeeid INNER JOIN department d ON e.departmentid = d.id WHERE e.id = ANY(${employeeId}) AND l.visible = true ORDER BY l.id DESC;`;
      return {
        statusCode: 200,
        message: 'Leave Details fetched Successfully',
        data: {
          leavehistory: {leaveDetail},
        },
      };
    } else {
      const leaveDetail = await prisma.$queryRaw`SELECT l.id AS leaveid, e.id AS employeeid, e.firstname ||' '|| e.lastname AS name, d.name AS departmenttname, l.leavetype, l.startdate, l.enddate, l.leavedescription, l.leavecreatedtime, l.leavestatus, l.leaveupdatedtime FROM public.employee e INNER JOIN public.leave l ON e.id = l.employeeid INNER JOIN department d ON e.departmentid = d.id INNER JOIN public.employee as me ON me.userid = ${userId} WHERE e.departmentid = me.departmentid AND e.id = ANY(${employeeId}) AND l.visible ORDER BY l.id DESC;`;
      return {
        statusCode: 200,
        message: 'Leave Details fetched Successfully',
        data: {
          leavehistory: {leaveDetail},
        },
      };
    }
  } catch (e) {
    throw e;
  }
};
exports.leaveHandler = leaveHandler;
