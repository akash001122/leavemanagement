'use strict';


const employeeHandler = async (request,h)=>{
    try{
        const {prisma} = request.server.app;
        const departmentId = request.query.departmentId;
        const employeeDetails = await prisma.$queryRaw`SELECT id AS employeeid, firstname ||' '|| lastname AS name, email, mobile, roledescription, departmentid, userid FROM public.employee WHERE departmentid = ANY(${departmentId}) AND visible = true;`;
        return {
                statusCode: 200,
                message: "Employee Details fetched Successfully",
                data: {
                    employee: employeeDetails
                }
        }
    }
    catch(e) {
        throw e
    }
}

exports.employeeHandler = employeeHandler;