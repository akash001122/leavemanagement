'use strict';

const employeeHandler = async (request,h)=>{
    const {prisma} = request.server.app;
    const empId = request.params.empId;    
    const valid = false
    await prisma.$queryRaw`UPDATE public."Employee" SET valid = ${valid} WHERE id = ${empId};`;
    return h.response("ok").code(200);
}

exports.employeeHandler = employeeHandler;

