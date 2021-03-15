'use strict';

const deptHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const departmentId = request.params.departmentId;
    const departmentDetails = await prisma.$queryRaw`SELECT * FROM public.department WHERE id = ${departmentId} AND visible = true;`;
    const newName = request.payload.name ? request.payload.name : departmentDetails[0].name;
    await prisma.$queryRaw`UPDATE public.department SET name = ${newName} WHERE  id = ${departmentId} AND visible = true;`;
    return {
      statusCode: 201,
      departmentId,
      message: `${newName} Department updated`,
    };
  } catch (e) {
    throw e;
  }
};
exports.deptHandler = deptHandler;
