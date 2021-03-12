'use strict';
const Boom  = require("@hapi/boom");

const employeeHandler = async (request,h)=>{
    try{
        const role = request.auth.credentials.role;
        const {prisma} = request.server.app;
        const employeeId = request.query.employeeId;
      
        if(role.includes('HR')){
            const employeeDetails = await prisma.$queryRaw`SELECT id AS employeeid, firstname ||' '|| lastname AS name, email, mobile, roledescription, departmentid, userid FROM public.employee WHERE id = ANY(${employeeId}) AND visible = true;`;
            return {
                statusCode: 200,
                message: "Employee Details fetched Successfully",
                data: {
                    employee: employeeDetails
                }
            }
        }else if (role.includes('MANAGER')){
            const managerDepartmentId = request.auth.credentials.departmentId;
            const employeeDetails = await prisma.$queryRaw`SELECT id AS employeeid, firstname ||' '|| lastname AS name, email, mobile, roledescription, departmentid, userid FROM public.employee WHERE departmentid = ${managerDepartmentId} AND id = ANY(${employeeId}) AND visible = true;`;
            return {
               statusCode: 200,
               message: "Employee Details fetched Successfully",
               data: {
                   employee: employeeDetails
               }
           }
        }else{
            return Boom.unauthorized("Unauthorized")
        }
    }
    catch(e) {
        throw e
    }
}

exports.employeeHandler = employeeHandler;