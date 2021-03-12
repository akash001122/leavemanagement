const { promisify } = require("util");
const redis = require("redis");
const client = redis.createClient();
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

client.on("error", function(error) {
    console.error(error);
  });

const logoutHandler = async function(request,h){
    try{
        const {tokenId} = request.auth.credentials;
        const tokenDetails = await getAsync(tokenId);
        const parsedTokenDetails = JSON.parse(tokenDetails);
        const credentials = {
            userId: parsedTokenDetails.userid,
            employeeId: parsedTokenDetails.employeeid,
            departmentId: parsedTokenDetails.departmentid,
            role: parsedTokenDetails.role,
            isValid: false
        }
        await setAsync(tokenId,JSON.stringify(credentials))
        return{
            statusCode:200,
            message: "Logged Out Successfully"
        }
        
    }catch(e){
        throw e;
    }
}



exports.logoutHandler = logoutHandler;