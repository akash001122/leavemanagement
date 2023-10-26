'use strict';

const Boom = require('@hapi/boom');
const {PrismaClient, prisma} = require('@prisma/client');

module.exports = {
  name: 'update_total_leaves_by_employeeId',
  method: async (employeeId) => {
    try {
      const prisma = new PrismaClient();
      const updateEmployee = await prisma.$queryRaw`UPDATE public.employee SET totalleavesleft = totalleavesleft - 1 WHERE id = ${employeeId} RETURNING totalleavesleft;`;
      if (!updateEmployee) {
        throw Boom.badRequest('Invalid Employee Id');
      }
      return updateEmployee;
    } catch (e) {
      throw Boom.badRequest(e);
    } finally {
      prisma.$disconnect();
    }
  },
};
