'use strict';

const employeeHandler = async (request,h)=>{
    //const {prisma} = request.server.app;
    const empId = request.params.empId;
    const { PrismaClient } = require('@prisma/client'); //
    const prisma = new PrismaClient() //
    var empDetail
    try{
        empDetail = await prisma.$queryRaw`SELECT * FROM public."Employee" WHERE id = ${empId} AND "valid" = true;`;
        await prisma.$disconnect();
        return h.response(empDetail).code(200);
    }
    catch(e) {
        throw e
    }
}

exports.employeeHandler = employeeHandler;