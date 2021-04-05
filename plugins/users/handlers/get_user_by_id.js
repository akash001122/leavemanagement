'use strict';

const employeeHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const userId = request.params.userId;
    const userDetails = await prisma.$queryRaw`SELECT id, username, role FROM public.userlogin WHERE id = ${userId} AND visibility =true;`;
    return {
      statusCode: 200,
      message: `User details fetched`,
      userDetails,
    };
  } catch (e) {
    throw e;
  }
};
exports.employeeHandler = employeeHandler;
