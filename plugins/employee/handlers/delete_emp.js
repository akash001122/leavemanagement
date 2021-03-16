'use strict';

const employeeHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const employeeId = request.query.employeeId;
    const visible = request.payload.visible !== undefined ? request.payload.visible : false;
    await prisma.$queryRaw`UPDATE public.employee SET visible = ${visible} WHERE id = ANY(${employeeId});`;
    let message;
    if (visible) {
      message = 'Employee unarchived';
    } else {
      message = 'Employee deleted';
    }
    return {
      statusCode: 201,
      employeeId,
      message,
    };
  } catch (e) {
    throw e;
  }
};

exports.employeeHandler = employeeHandler;
