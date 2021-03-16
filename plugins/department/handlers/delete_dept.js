'use strict';

const deptHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const departmentId = request.query.departmentId;
    const visible = request.payload.visible !== undefined ? request.payload.visible : false;
    await prisma.$queryRaw`UPDATE public.department SET visible = ${visible} WHERE id = ANY(${departmentId});`;
    let message;
    if (visible) {
      message = 'Department unarchived';
    } else {
      message = 'Department deleted';
    }
    return {
      statusCode: 201,
      departmentId,
      message,
    };
  } catch (e) {
    throw e;
  }
};
exports.deptHandler = deptHandler;
