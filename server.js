const Hapi = require('@hapi/hapi');
const prisma = require('./prismaplugin/prisma');
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const {employeePlugin} = require('./plugins/employee/index');
const {authPlugin} = require('./plugins/auth/index');
const {leavePlugin} = require('./plugins/apply_leave/index');
const {managerPlugin} = require('./plugins/leave_management/manager_leave/index');
const {hrPlugin} = require('./plugins/leave_management/hr_leave/index');
const {departmentPlugin} = require('./plugins/department');

const server = Hapi.server({
  port: 3000,
  debug: { request: ['error','database'] }
  // host: 'localhost',
});

const init = async (server) => {
  const swaggerOptions = {
    info: {
      title: 'Leave Management API Documentation',
      version: Pack.version,
    },
    securityDefinitions: {
      Bearer: {
        'type': 'apiKey',
        'name': 'Authorization',
        'in': 'header',
        'x-keyPrefix': 'Bearer',
      },
    },
    security: [{Bearer: []}],
  };
  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions,
    }, authPlugin,
    {
      plugin: require('hapi-authorization'),
      options: {
        roles: ['HR', 'MANAGER', 'EMPLOYEE'],
      },
    },
    prisma,
    departmentPlugin,
    employeePlugin,
    leavePlugin,
    managerPlugin,
    hrPlugin,
  ]);
  await server.initialize();
  await server.route({
    method: 'GET',
    path: '/',
    options: {
      auth: false,
      description: 'Home Page',
      notes: 'Welcome page',
      tags: ['api'],
    },
    handler: (request, h)=>{
      return h.response({up: true});
    },
  });
  await server.start();
  console.log(`Server running on ${server.info.uri}`);
  return server;
};
process.on('unhandledRejection', (err)=>{
  console.log(err);
  process.exit(1);
});

init(server);
