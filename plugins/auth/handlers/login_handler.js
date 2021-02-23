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
        const fetchUser = await prisma.$queryRaw`SELECT * FROM public.userlogin WHERE username = ${userName};`;
        if(userName === fetchUser[0].username){
            const match = await bcrypt.compare(password,fetchUser[0].password);
            if(match){
                tokenId = uuid.v4();
                const jwtToken = generateAuthToken(tokenId);
                const credentials = {
                    tokenId,
                    userId: fetchUser[0].id,
                    empId: fetchUser[0].empid,
                    role: fetchUser[0].role,
                    isValid: true
                }
                await setAsync(tokenId,JSON.stringify(credentials))
                return {
                    statusCode: 200,
                    message: "Login Successfull",
                    data: {
                        id: fetchUser[0].id,
                        empId: fetchUser[0].empid,
                        userName: fetchUser[0].username,
                        role: fetchUser[0].role,
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