'use strict';

const leaveHandler = async (request,h) => {
    try{
        const userId = request.auth.credentials.userId;
        const managerDepartmentId = await request.server.methods.getDeptId(userId)
        const {prisma} = request.server.app;
        const leaveDetail = await prisma.$queryRaw`SELECT l.id AS leaveid, e.firstname ||' '|| e.lastname AS name, d.name AS departmenttname, l.leavetype, l.startdate, l.enddate, l.leavedescription, l.leavecreatedtime, l.leavestatus, l.leaveupdatedtime, l.totalleavesleft  FROM public.employee e INNER JOIN public.leave l ON e.id = l.employeeid INNER JOIN department d ON e.departmentid = d.id WHERE e.departmentid = ${managerDepartmentId} ORDER BY l.id DESC;`;
        return {
                statusCode: 200,
                message: "Leave Details fetched Successfully",
                data: {
                    leavehistory: {leaveDetail}
                }
        }
    }catch(e){
        throw e;
    }
}
exports.leaveHandler = leaveHandler;

