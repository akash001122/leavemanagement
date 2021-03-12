'use strict';

const employeeHandler = async (request,h) => {
    try{
            const {prisma} = request.server.app;
            const employeeId = request.params.employeeId;
            var getDetails = await prisma.$queryRaw`SELECT e.firstname, e.lastname, e.email, e.mobile, e.roledescription, e.departmentid, u.id as userId, u.username, u.role FROM public.employee e INNER JOIN public.userlogin u ON e.userid = u.id WHERE e.id = ${employeeId} AND visible = true;`;
            const firstName = request.payload.firstName ? request.payload.firstName : getDetails[0].firstname;
            const lastName = request.payload.lastName ? request.payload.lastName : getDetails[0].lastname;
            const email = request.payload.email ? request.payload.email : getDetails[0].email;
            const mobile = request.payload.mobile ? request.payload.mobile : getDetails[0].mobile;
            const roleDescription = request.payload.roleDescription ? request.payload.roleDescription : getDetails[0].roledescription;
            const userName = request.payload.userName ? request.payload.userName : getDetails[0].username;
            const role = request.payload.role ? request.payload.role : getDetails[0].role;
            const departmentId = request.payload.depId ? request.payload.depId : getDetails[0].departmentid;
            
            var updateEmployee = await prisma.$queryRaw`UPDATE public.employee SET firstname = ${firstName}, lastname = ${lastName}, email = ${email}, mobile = ${mobile}, roledescription = ${roleDescription}, departmentid = ${departmentId} WHERE id = ${employeeId} RETURNING *;`;
            await prisma.$queryRaw`UPDATE public.userlogin SET username = ${userName}, role = ${role} WHERE id = ${getDetails[0].userId};`;
            return {
                statusCode: 201,
                employeeId,
                message: `Employee ${firstName} updated`,
                data: updateEmployee[0]
            }; 
    }catch(e){
        throw e;
    }
}
exports.employeeHandler = employeeHandler;




