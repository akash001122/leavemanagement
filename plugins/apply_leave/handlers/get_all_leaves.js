'use strict';

const leaveHandler = async (request,h) => {
    
    try{
        const userId = request.auth.credentials.userId;
        const employeeId = await request.server.methods.getEmployeeIdByUserId(userId)
        const {prisma} = request.server.app;
        const leaveDetail = await prisma.$queryRaw`SELECT l.id AS leaveid, e.firstname ||' '|| e.lastname AS name, d.name AS departmentname, l.leavetype, l.startdate, l.enddate, l.leavedescription, l.leavecreatedtime, l.leavestatus, l.leaveupdatedtime, l.totalleavesleft  FROM public.employee e INNER JOIN public.leave l ON e.id = l.employeeid INNER JOIN public.department d ON e.departmentid = d.id WHERE l.visible = true AND l.employeeid = ${employeeId};`;
        return {
                statusCode: 200,
                message: "Leave Details fetched Successfully",
                data: {
                    employeeId,
                    leavehistory: leaveDetail
                }
        }
    }catch(e){
        throw e;
    }
}
exports.leaveHandler = leaveHandler;