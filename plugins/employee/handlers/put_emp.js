'use strict';
const bcrypt = require('bcrypt');

const employeeHandler = async (request,h) => {
    const firstName = request.payload.firstName;
    const lastName = request.payload.lastName;
    const email = request.payload.email;
    const mobile = request.payload.mobile;
    const roleDescription = request.payload.roleDescription;
    const userName = request.payload.userName;
    var password = request.payload.password;
    const role = request.payload.role;
    const depId = request.payload.depId;
    const empId = request.params.empId;
    const {prisma} = request.server.app;
  
    var hash = await bcrypt.hash(password,10);
    password = hash;
    
    var updateEmp = await prisma.$queryRaw`UPDATE public."Employee" SET "firstName" = ${firstName}, "lastName" = ${lastName}, email = ${email}, mobile = ${mobile}, "roleDescription" = ${roleDescription}, "depId" = ${depId} WHERE "id" = ${empId};`;
    var updateUser = await prisma.$queryRaw`UPDATE public."Userlogin" SET "userName" = ${userName}, "password" = ${password}, "role" = ${role} WHERE "empId" = ${empId};`;
   
    return h.response("ok").code(201);
}
exports.employeeHandler = employeeHandler;




