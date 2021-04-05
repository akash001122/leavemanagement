'use strict';

const employeeHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const employeeId = request.params.employeeId;
    const getDetails = await prisma.$queryRaw`SELECT firstname, lastname, email, mobile, roledescription, departmentid FROM public.employee WHERE id = ${employeeId} AND visible = true;`;
    const firstName = request.payload.firstName ? request.payload.firstName : getDetails[0].firstname;
    const lastName = request.payload.lastName ? request.payload.lastName : getDetails[0].lastname;
    const email = request.payload.email ? request.payload.email : getDetails[0].email;
    const mobile = request.payload.mobile ? request.payload.mobile : getDetails[0].mobile;
    const roleDescription = request.payload.roleDescription ?
      request.payload.roleDescription :
      getDetails[0].roledescription;
    const departmentId = request.payload.depId ? request.payload.depId : getDetails[0].departmentid;

    const updateEmployee = await prisma.$queryRaw`UPDATE public.employee SET firstname = ${firstName}, lastname = ${lastName}, email = ${email}, mobile = ${mobile}, roledescription = ${roleDescription}, departmentid = ${departmentId} WHERE id = ${employeeId} RETURNING *;`;
    return {
      statusCode: 201,
      employeeId,
      message: `Employee ${firstName} updated`,
      data: updateEmployee[0],
    };
  } catch (e) {
    throw e;
  }
};
exports.employeeHandler = employeeHandler;
