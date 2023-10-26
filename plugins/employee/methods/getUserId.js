'use strict';
const {PrismaClient} = require('@prisma/client');
const getUserIdByEmployeeId = async (employeeId) => {
  const prisma = new PrismaClient();
  const user = await prisma.$queryRaw`SELECT userid FROM public.employee WHERE id =${employeeId};`;
  prisma.$disconnect();
  return user[0].userid;
};
exports.getUserIdByEmployeeId = getUserIdByEmployeeId;
