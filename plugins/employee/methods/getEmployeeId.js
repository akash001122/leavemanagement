'use strict';
const {PrismaClient} = require('@prisma/client');
const getEmployeeIdByUserId = async (userId) => {
  const prisma = new PrismaClient();
  const employee = await prisma.$queryRaw`SELECT id FROM public.employee WHERE userid =${userId};`;
  prisma.$disconnect();
  return employee[0].id;
};
exports.getEmployeeIdByUserId = getEmployeeIdByUserId;
