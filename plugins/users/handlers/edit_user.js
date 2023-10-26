'use strict';

module.exports = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const userId = request.params.userId;
    const {role} = request.payload;
    const userDetails = await prisma.$queryRaw`UPDATE public.userlogin SET role = ${role} WHERE id = ${userId} AND visibility = true RETURNING id, username, role;`;
    return {
      statusCode: 201,
      message: `User role updated`,
      userDetails,
    };
  } catch (e) {
    throw e;
  }
};
