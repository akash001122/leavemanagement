'use strict';
const {PrismaClient} = require('@prisma/client');
const getDeptIdByEmployeeId = async (employeeId) => {
  const prisma = new PrismaClient();
  const department = await prisma.$queryRaw`SELECT departmentid FROM public.employee WHERE userid =${employeeId};`;
  prisma.$disconnect();
  return department[0].departmentid;
};
exports.getDeptIdByEmployeeId = getDeptIdByEmployeeId;
