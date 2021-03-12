'use strict';

const deptHandler = async (request,h) => {
    try{
            const {prisma} = request.server.app;
            const {name} = request.payload;
            var department = await prisma.$queryRaw`INSERT INTO public.department(name) VALUES (${name}) RETURNING *;`;  
            return {
                statusCode: 201,
                message: `${name} Department created`,
                departmentId: department[0].id
            }; 
    }catch(e){
        throw e;
    }
}
exports.deptHandler = deptHandler;