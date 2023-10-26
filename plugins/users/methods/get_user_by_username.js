'use strict';
const Boom = require('@hapi/boom');
const {PrismaClient} = require('@prisma/client');

module.exports = {
  name: 'get_user_by_username',
  method: async (userName) => {
    try {
      const prisma = new PrismaClient();
      const userId = await prisma.$queryRaw`SELECT id FROM public.userlogin WHERE username = ${userName};`;
      if (!userId) {
        throw Boom.badRequest('Invalid user ID');
      }
      return userId;
    } catch (e) {
      throw Boom.badRequest(e);
    }
  },
};
