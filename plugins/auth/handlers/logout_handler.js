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
        const det = JSON.parse(tokenDetails);
        const credentials = {
            tokenId,
            userId: det.userid,
            empId: det.employeeid,
            dept: det.depid,
            role: det.role,
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