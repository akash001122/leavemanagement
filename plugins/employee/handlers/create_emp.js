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
    const {prisma} = request.server.app;
    var createEmp

    // Generate a salt at level 10 strength
    
    var hash = await bcrypt.hash(password,10);
    password = hash;
    
    createEmp = await prisma.$queryRaw`INSERT INTO public."Employee"("firstName", "lastName", email, mobile, "roleDescription", "depId") VALUES (${firstName},${lastName},${email},${mobile},${roleDescription},${depId}) RETURNING *;`;
    await prisma.$queryRaw`INSERT INTO public."Userlogin"("userName", "password", "role", "empId") VALUES (${userName},${password},${role},${createEmp[0].id});`;
    
    return h.response(createEmp).code(201);
}
exports.employeeHandler = employeeHandler;