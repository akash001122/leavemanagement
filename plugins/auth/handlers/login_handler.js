const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const {JWT_SECRET} = require('../../../config/config');
const JWT_ALGORITHM = require('../../../config/config');
const uuid = require("uuid");
const { promisify } = require("util");
const redis = require("redis");
const client = redis.createClient();
const jwt = require('jsonwebtoken');

const setAsync = promisify(client.set).bind(client);

client.on("error", function(error) {
    console.error(error);
  });


const loginHandler = async function(request,h) {
    const {userName, password} = request.payload;
    const {prisma} = request.server.app;
    try{
        const fetchEmployee = await prisma.$queryRaw`SELECT e.id AS employeeid,u.id as userid, e.depid, u.username,u.password,u.role FROM public.employee e INNER JOIN public.userlogin u ON e.id = u.empid WHERE u.username = ${userName};`
        console.log(fetchEmployee[0])
        if(userName === fetchEmployee[0].username){
            const match = await bcrypt.compare(password,fetchEmployee[0].password);
            if(match){
                tokenId = uuid.v4();
                const jwtToken = generateAuthToken(tokenId);
                const credentials = {
                    tokenId,
                    userId: fetchEmployee[0].userid,
                    empId: fetchEmployee[0].employeeid,
                    dept: fetchEmployee[0].depid,
                    role: fetchEmployee[0].role,
                    isValid: true
                }
                await setAsync(tokenId,JSON.stringify(credentials))
                return {
                    statusCode: 200,
                    message: "Login Successfull",
                    data: {
                        id: fetchEmployee[0].userid,
                        empId: fetchEmployee[0].employeeid,
                        userName: fetchEmployee[0].username,
                        role: fetchEmployee[0].role,
                        jwt: jwtToken
                    }
                }
            }else{
                return Boom.unauthorized("Invalid Password");
            }
        }else{
            return Boom.unauthorized("Invalid Username");
        }
    }catch(e){
        return Boom.badImplementation(e.message);
    }
    
}

exports.loginHandler = loginHandler;



function generateAuthToken(tokenId) {
    
    const jwtPayload = {
        tokenId,
        isValid: true,
    };

    return jwt.sign( jwtPayload ,'classified',{
        expiresIn: "30 days"
    });
}