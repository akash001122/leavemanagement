'use strict';


const deptHandler = async (request,h) => {
    try{
            const {prisma} = request.server.app;
            const departmentId = request.query.departmentId;
            const department = await prisma.$queryRaw`SELECT id, name FROM public.department WHERE id = ANY(${departmentId}) AND visible = true;`;    
            return {
                statusCode: 200,
                message: `Department Fetched Successfully`,
                data: department
            }
    }catch(e){
        throw e;
    }
}
exports.deptHandler = deptHandler;