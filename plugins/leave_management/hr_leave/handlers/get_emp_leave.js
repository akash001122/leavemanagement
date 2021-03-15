'use strict';

const leaveHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const employeeId = request.query.employeeId;
    const leaveDetail = await prisma.$queryRaw`SELECT l.id AS leaveid, e.firstname ||' '|| e.lastname AS name, d.name AS departmentname, l.leavetype, l.startdate, l.enddate, l.leavedescription, l.leavecreatedtime, l.leavestatus, l.leaveupdatedtime, l.totalleavesleft  FROM public.employee e INNER JOIN public.leave l ON e.id = l.employeeid INNER JOIN department d ON e.departmentid = d.id WHERE e.id = ANY(${employeeId}) ORDER BY l.id DESC;`;
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
