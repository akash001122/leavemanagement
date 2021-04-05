'use strict';
const bcrypt = require('bcrypt');

const employeeHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const userId = request.params.userId;
    const password = request.payload.password;
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.$queryRaw`UPDATE public.userlogin SET password = ${hashPassword} WHERE id = ${userId} AND visibility = true;`;
    return {
      statusCode: 201,
      userId,
      message: `User password updated`,
    };
  } catch (e) {
    throw e;
  }
};
exports.employeeHandler = employeeHandler;
