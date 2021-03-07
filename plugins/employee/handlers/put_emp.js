'use strict';
const { promisify } = require("util");
const Boom  = require("@hapi/boom");
const redis = require("redis");
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);
client.on("error", function(error) {
    console.error(error);
  });
const bcrypt = require('bcrypt');

const employeeHandler = async (request,h) => {
    try{
        const {tokenId} = request.auth.credentials;
        const tokenDetails = await getAsync(tokenId);
        const det = JSON.parse(tokenDetails);
        if(det.role === "HR" && det.isValid){

            const {prisma} = request.server.app;
            const empId = request.params.empId;
            var getDet = await prisma.$queryRaw`SELECT * FROM public.employee WHERE id = ${empId} AND valid = true;`;
            var getUserDet = await prisma.$queryRaw`SELECT * FROM public.userlogin WHERE empid = ${empId};`;
            const firstName = request.payload.firstName ? request.payload.firstName : getDet[0].firstname;
            const lastName = request.payload.lastName ? request.payload.lastName : getDet[0].lastname;
            const email = request.payload.email ? request.payload.email : getDet[0].email;
            const mobile = request.payload.mobile ? request.payload.mobile : getDet[0].mobile;
            const roleDescription = request.payload.roleDescription ? request.payload.roleDescription : getDet[0].roledescription;
            const userName = request.payload.userName ? request.payload.userName : getUserDet[0].username;
            const role = request.payload.role ? request.payload.role : getUserDet[0].role;
            const depId = request.payload.depId ? request.payload.depId : getDet[0].depid;
            
            var updateEmp = await prisma.$queryRaw`UPDATE public.employee SET firstname = ${firstName}, lastname = ${lastName}, email = ${email}, mobile = ${mobile}, roledescription = ${roleDescription}, depid = ${depId} WHERE id = ${empId} RETURNING *;`;
            var updateUser = await prisma.$queryRaw`UPDATE public.userlogin SET username = ${userName}, role = ${role} WHERE empid = ${empId};`;
            return {
                statusCode: 201,
                empId,
                message: `Employee ${firstName} updated`,
                data: updateEmp[0],
                jwt: tokenId
            };
        }else{
            return Boom.unauthorized("Unauthorized")
        }  
    }catch(e){
        throw e;
    }
}
exports.employeeHandler = employeeHandler;




