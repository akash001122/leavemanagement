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
            const {prisma} = request.server.app;
            var createEmp
        
            // Generate a salt at level 10 strength
            
            var hash = await bcrypt.hash(password,10);
            password = hash;
            
            createEmp = await prisma.$queryRaw`INSERT INTO public.employee(firstname, lastname, email, mobile, roledescription, depid) VALUES (${firstName},${lastName},${email},${mobile},${roleDescription},${depId}) RETURNING *;`;
            await prisma.$queryRaw`INSERT INTO public.userlogin(username, password, role, empid) VALUES (${userName},${password},${role},${createEmp[0].id});`;
            
            return h.response(createEmp).code(201);
        }else{
            return{
                Message: "Access Denied"
            }
        }


    }catch(e){
        throw e;
    }
}
exports.employeeHandler = employeeHandler;