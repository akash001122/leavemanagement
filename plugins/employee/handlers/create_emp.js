'use strict';
const bcrypt = require('bcrypt');

const employeeHandler = async (request, h) => {
  try {
    const firstName = request.payload.firstName;
    const lastName = request.payload.lastName;
    const email = request.payload.email;
    const mobile = request.payload.mobile;
    const roleDescription = request.payload.roleDescription;
    const userName = request.payload.userName;
    let password = request.payload.password;
    const role = request.payload.role;
    const departmentId = request.payload.departmentId;
    const {prisma} = request.server.app;

    // Generate a salt at level 10 strength

    const hash = await bcrypt.hash(password, 10);
    password = hash;
    const userDetails = await prisma.$queryRaw`INSERT INTO public.userlogin(username, password, role) VALUES (${userName},${password},${role}) RETURNING id;`;
    const createEmployee = await prisma.$queryRaw`INSERT INTO public.employee(firstname, lastname, email, mobile, roledescription, departmentid, userid) VALUES (${firstName},${lastName},${email},${mobile},${roleDescription},${departmentId}, ${userDetails[0].id}) RETURNING *;`;

    return {
      statusCode: 201,
      message: `Employee ${firstName} created`,
      data: createEmployee,
    };
  } catch (e) {
    throw e;
  }
};
exports.employeeHandler = employeeHandler;
