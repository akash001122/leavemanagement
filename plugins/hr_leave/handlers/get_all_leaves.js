'use strict';

const leaveHandler = async (request,h) => {
    
    const {prisma} = request.server.app;

    
    const leaveDetail = await prisma.$queryRaw`SELECT * FROM public."Leave";`;
    return {
        statusCode: 200,
        message: "Leave Details fetched Successfully",
        data: {
            leavehistory: {leaveDetail},
            jwt: jwtToken
        }
    }
}
exports.leaveHandler = leaveHandler;