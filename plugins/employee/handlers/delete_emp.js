'use strict';

const employeeHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const employeeId = request.query.employeeId;
    await prisma.$queryRaw`UPDATE public.employee SET visible  = NOT visible WHERE id = ANY(${employeeId});`;
    return {
      statusCode: 201,
      employeeId,
      message: 'Updated Archive status successfully',
    };
  } catch (e) {
    throw e;
  }
};

exports.employeeHandler = employeeHandler;
