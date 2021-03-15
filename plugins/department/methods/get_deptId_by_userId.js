'use strict';
const {PrismaClient} = require('@prisma/client');
const getDeptIdByUserId = async (userId) => {
  const prisma = new PrismaClient();
  const department = await prisma.$queryRaw`SELECT departmentid FROM public.employee WHERE userid =${userId};`;
  prisma.$disconnect();
  return department[0].departmentid;
};
exports.getDeptIdByUserId = getDeptIdByUserId;
