const {PrismaClient} = require('@prisma/client');

exports.plugin = {
  name: 'prisma',
  register: async function(server) {
    try {
      const prisma = new PrismaClient();
      server.app.prisma = prisma;
    } catch (e) {
      throw e;
    } finally {
      server.app.prisma.$disconnect();
    }
  },
};
