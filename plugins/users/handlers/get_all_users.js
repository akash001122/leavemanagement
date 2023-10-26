'use strict';

module.exports = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const userDetails = await prisma.$queryRaw`SELECT id, username, role FROM public.userlogin WHERE visibility =true;`;
    return {
      statusCode: 200,
      message: `User details fetched`,
      userDetails,
    };
  } catch (e) {
    throw e;
  }
};
