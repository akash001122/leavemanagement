'use strict';

const employeeHandler = async (request,h)=>{
    const {prisma} = request.server.app;
    var empDetail
    empDetail = await prisma.$queryRaw`SELECT * FROM public."Employee" WHERE "valid" = true;`;
    return h.response(empDetail).code(200);
}

exports.employeeHandler = employeeHandler;