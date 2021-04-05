'use strict';
const bcrypt = require('bcrypt');

const employeeHandler = async (request, h) => {
  try {
    const userName = request.payload.userName;
    let password = request.payload.password;
    const role = request.payload.role;
    const {prisma} = request.server.app;

    // Generate a salt at level 10 strength

    const hash = await bcrypt.hash(password, 10);
    password = hash;
    const userDetails = await prisma.$queryRaw`INSERT INTO public.userlogin(username, password, role) VALUES (${userName},${password},${role}) RETURNING id;`;
    return {
      statusCode: 201,
      message: `User ${userName} created`,
      data: userDetails,
    };
  } catch (e) {
    throw e;
  }
};
exports.employeeHandler = employeeHandler;
