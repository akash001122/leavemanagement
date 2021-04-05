'use strict';

const Boom = require('@hapi/boom');
const {PrismaClient, prisma} = require('@prisma/client');

module.exports = {
  name: 'update_leave_status_by_leaveId',
  method: async (leaveId, leaveStatus) => {
    try {
      const prisma = new PrismaClient();
      const leaveDetail = await prisma.$queryRaw`UPDATE public.leave SET leavestatus= ${leaveStatus}, leaveupdatedtime = ${Date.now()} WHERE id = ${leaveId};`;
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
