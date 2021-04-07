'use strict';

const employeeHandler = async (request, h) => {
  try {
    const firstName = request.payload.firstName;
    const lastName = request.payload.lastName;
    const email = request.payload.email;
    const mobile = request.payload.mobile;
    const roleDescription = request.payload.roleDescription;
    const userId = request.payload.userId;
    const departmentId = request.payload.departmentId;
    const {prisma} = request.server.app;
    const createEmployee = await prisma.$queryRaw`INSERT INTO public.employee(firstname, lastname, email, mobile, roledescription, departmentid, userid) VALUES (${firstName},${lastName},${email},${mobile},${roleDescription},${departmentId}, ${userId}) RETURNING *;`;

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
