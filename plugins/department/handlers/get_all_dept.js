'use strict';

const deptHandler = async (request,h) => {
    try{
        const {prisma} = request.server.app;
        const department = await prisma.$queryRaw`SELECT id, name FROM public.department WHERE visible = true;`;    
        return {
            statusCode: 200,
            message: `Departments Fetched Successfully`,
            data: department
        }
            

    }catch(e){
        throw e;
    }
}
exports.deptHandler = deptHandler;