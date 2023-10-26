'use strict';

const deptHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const departmentId = request.query.departmentId;
    await prisma.$queryRaw`UPDATE public.department SET visible = NOT visible WHERE id = ANY(${departmentId});`;
    return {
      statusCode: 201,
      departmentId,
      message: 'Department archive status updated successfully',
    };
  } catch (e) {
    throw e;
  }
};
exports.deptHandler = deptHandler;
