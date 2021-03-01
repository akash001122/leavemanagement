'use strict';
const { promisify } = require("util");
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
        if(det.role === "HR"){

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
            
            var updateEmp = await prisma.$queryRaw`UPDATE public.employee SET firstname = ${firstName}, lastname = ${lastName}, email = ${email}, mobile = ${mobile}, roledescription = ${roleDescription}, depid = ${depId} WHERE id = ${empId};`;
            var updateUser = await prisma.$queryRaw`UPDATE public.userlogin SET username = ${userName}, password = ${password}, role = ${role} WHERE empid = ${empId};`;
           
            return {
                statusCode: 201,
                message: `Employee ${firstName} updated`,
                data: updateEmp,
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




