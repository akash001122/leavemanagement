'use strict';
const bcrypt = require('bcrypt');

const employeeHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const employeeId = request.params.employeeId;
    const userId = await request.server.methods.getUserIdByEmployeeId(employeeId);
    const password = request.payload.password;
    const hashPassword = await bcrypt.hash(password, 10);
    await prisma.$queryRaw`UPDATE public.userlogin SET password = ${hashPassword} WHERE id = ${userId};`;
    return {
      statusCode: 201,
      employeeId,
      message: `Employee password updated`,
    };
  } catch (e) {
    throw e;
  }
};
exports.employeeHandler = employeeHandler;
