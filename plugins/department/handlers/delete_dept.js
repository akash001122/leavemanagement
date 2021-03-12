'use strict';

const deptHandler = async (request,h) => {
    try{
            const {prisma} = request.server.app;
            const departmentId = request.query.departmentId;
            await prisma.$queryRaw`UPDATE public.department SET visible = false WHERE id = ANY(${departmentId});`;  
            return {
                statusCode: 201,
                departmentId,
                message: `Department deleted`
            }
    }catch(e){
        throw e;
    }
}
exports.deptHandler = deptHandler;