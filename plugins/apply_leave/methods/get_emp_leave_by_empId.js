'use strict';

const Boom = require('@hapi/boom');
const {PrismaClient, prisma} = require('@prisma/client');

module.exports = {
  name: 'get_emp_leave_by_empId',
  method: async (employeeId) => {
    try {
      const prisma = new PrismaClient();
      const leaveDetail = await prisma.$queryRaw`SELECT l.id AS leaveid, e.firstname ||' '|| e.lastname AS name, d.name AS departmentname, l.leavetype, l.startdate, l.enddate, l.leavedescription, l.leavecreatedtime, l.leavestatus, l.leaveupdatedtime, l.totalleavesleft  FROM public.employee e INNER JOIN public.leave l ON e.id = l.employeeid INNER JOIN department d ON e.departmentid = d.id WHERE e.id = ANY(${employeeId}) ORDER BY l.id DESC;`;
      if (!leaveDetail) {
        throw Boom.badRequest('No leaves applied');
      }
      return leaveDetail;
    } catch (e) {
      throw Boom.badRequest(e);
    } finally {
      prisma.$disconnect();
    }
  },
};
