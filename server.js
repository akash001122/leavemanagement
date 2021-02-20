const Hapi = require('@hapi/hapi')
const {PrismaClient} = require('@prisma/client')
const prisma = require('./prismaplugin/prisma')
const {employeePlugin} = require('./plugins/employee/index');
const { authPlugin } = require('./plugins/auth/index');
const {leavePlugin} = require('./plugins/apply_leave/index');


const server = Hapi.server({
    port: 3000,
    host: 'localhost',
});


const init = async (server) => {
    
    await server.register([authPlugin,employeePlugin,leavePlugin,prisma]);
    await server.initialize();
    await server.start();
    console.log(`Server running on ${server.info.uri}`);
    return server;
}
process.on('unhandledRejection',(err)=>{
    console.log(err);
    process.exit(1);
});

init(server);