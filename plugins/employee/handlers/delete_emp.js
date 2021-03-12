'use strict';

const employeeHandler = async (request,h)=>{
    try{
            const {prisma} = request.server.app;
            const employeeId = request.query.employeeId;    
            await prisma.$queryRaw`UPDATE public.employee SET visible = false WHERE id = ANY(${employeeId});`;
            return {
                statusCode: 201,
                employeeId,
                message: `Employee deleted`
            };
    }catch(e){
        throw e;
    }
}

exports.employeeHandler = employeeHandler;

