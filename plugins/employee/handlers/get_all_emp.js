'use strict';
const Boom = require('@hapi/boom');

const employeeHandler = async (request, h) => {
  try {
    const {prisma} = request.server.app;
    const role = request.auth.credentials.role;
    if (role.includes('HR')) {
      // eslint-disable-next-line max-len
      const employeeDetail = await prisma.$queryRaw`SELECT id AS employeeid, firstname ||' '|| lastname AS name, email, mobile, roledescription, departmentid, userid FROM public.employee WHERE visible = true;`;
      return {
        statusCode: 200,
        message: 'Employee Details fetched Successfully',
        data: {
          employee: {employeeDetail},
        },
      };
    } else if (role.includes('MANAGER')) {
      const managerDepartmentId = request.auth.credentials.departmentId;
      // eslint-disable-next-line max-len
      const employeeDetail = await prisma.$queryRaw`SELECT id, firstname ||' '|| lastname AS name, email, mobile, roledescription, departmentid, userid FROM public.employee WHERE visible = true AND departmentid = ${managerDepartmentId};`;
      return {
        statusCode: 200,
        message: 'Employee Details fetched Successfully',
        data: {
          employee: employeeDetail,
        },
      };
    } else {
      return Boom.unauthorized('Unauthorized');
    }
  } catch (e) {
    throw e;
  }
};

exports.employeeHandler = employeeHandler;
