const Hapi = require('@hapi/hapi')
const prisma = require('./prismaplugin/prisma')
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');
const {employeePlugin} = require('./plugins/employee/index');
const { authPlugin } = require('./plugins/auth/index');
const {leavePlugin} = require('./plugins/apply_leave/index');
const {managerPlugin} = require('./plugins/manager_leave/index');
const {hrPlugin} = require('./plugins/hr_leave/index');
const { departmentPlugin } = require('./plugins/create_department');

const server = Hapi.server({
    port: 3000,
    host: 'localhost',
});

const init = async (server) => {
    const swaggerOptions = {
        info: {
                title: 'Leave Management API Documentation',
                version: Pack.version,
            },
        };
    await server.register([Inert,Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        },authPlugin, prisma, employeePlugin, leavePlugin, managerPlugin, hrPlugin, departmentPlugin]);
    await server.initialize();
    await server.route({
        method:'GET',
        path: '/',
        options:{
            auth:false,
            description: 'Home Page',
            notes: 'Welcome page',
            tags: ['api'],
        },
        handler: (request,h)=>{
            return h.response({up:true});
        }
    })
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
}
process.on('unhandledRejection',(err)=>{
    console.log(err);
    process.exit(1);
});

init(server);