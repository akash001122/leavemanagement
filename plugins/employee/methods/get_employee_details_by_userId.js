'use strict';

const Boom = require('@hapi/boom');
const {PrismaClient, prisma} = require('@prisma/client');

module.exports = {
  name: 'get_employee_details_by_userId',
  method: async (userId) => {
    try {
      const prisma = new PrismaClient();
      const employee = await prisma.$queryRaw`SELECT * FROM public.employee WHERE userid =${userId};`;
      if (!employee) {
        throw Boom.badRequest('Invalid Employee Id');
      }
      return employee[0];
    } catch (e) {
      throw Boom.badRequest(e);
    } finally {
      prisma.$disconnect();
    }
  },
};
