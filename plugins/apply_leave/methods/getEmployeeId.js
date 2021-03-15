'use strict';
const {PrismaClient} = require('@prisma/client');
const getEmployeeIdByLeaveId = async (leaveId) => {
  const prisma = new PrismaClient();
  const employee = await prisma.$queryRaw`SELECT employeeid FROM public.leave WHERE id =${leaveId};`;
  prisma.$disconnect();
  return employee[0].employeeid;
};
exports.getEmployeeIdByLeaveId = getEmployeeIdByLeaveId;
