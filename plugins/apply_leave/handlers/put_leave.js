'use strict';

const leaveHandler = async (request,h) => {
    try{
        const {prisma} = request.server.app;
        const leaveId = request.params.leaveId;
        const userId = request.auth.credentials.userId;
        const employeeId = await request.server.methods.getEmployeeIdByUserId(userId)
        const getLeave = await prisma.$queryRaw`SELECT * FROM public.leave WHERE id = ${leaveId} AND employeeid = ${employeeId}`;
        const leaveType = request.payload.leaveType ? request.payload.leaveType : getLeave[0].leavetype;
        const startDate = new Date(request.payload.startDate ? request.payload.startDate : getLeave[0].startdate);
        const endDate = new Date(request.payload.endDate ? request.payload.endDate : getLeave[0].enddate);
        const leaveDescription = request.payload.leaveDescription ? request.payload.leaveDescription : getLeave[0].leavedescription;
        if(getLeave[0].leavestatus ==="PENDING" && getLeave[0].visible === true){
            await prisma.$queryRaw`UPDATE public.leave SET leavetype = ${leaveType},startdate = ${startDate}, enddate = ${endDate}, leavedescription = ${leaveDescription} WHERE id = ${leaveId} AND employeeid = ${employeeId};`;
            return {
                    statusCode: 201,
                    message: "Leave Updated",
                    data: {
                        leaveId,
                        employeeId,
                        leaveType: leaveType,
                        from: startDate,
                        to: endDate,
                        leaveDescription
                    }
            }
        }else{
            return{
                    statusCode: 403,
                    message: "Cannot Update the Leave Which is Approved/Rejected or Deleted"
                }
        }
    }catch(e){
        throw e;
    }
}
exports.leaveHandler = leaveHandler;