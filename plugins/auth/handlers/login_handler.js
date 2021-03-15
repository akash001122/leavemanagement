const Boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const {JWT_SECRET} = require('../../../config/config');
const uuid = require('uuid');
const {promisify} = require('util');
const redis = require('redis');
const client = redis.createClient();
const jwt = require('jsonwebtoken');
const setAsync = promisify(client.set).bind(client);

client.on('error', function(error) {
  console.error(error);
});

const loginHandler = async function(request, h) {
  const {userName, password} = request.payload;
  const {prisma} = request.server.app;
  try {
    const fetchEmployee = await prisma.$queryRaw`SELECT e.id AS employeeid,e.userid, e.departmentid, u.username, u.password, u.role FROM public.employee e INNER JOIN public.userlogin u ON e.userid = u.id WHERE u.username = ${userName} AND e.visible = true;`;
    if (fetchEmployee.length > 0) {
      const match = await bcrypt.compare(password, fetchEmployee[0].password);
      if (match) {
        tokenId = uuid.v4();
        const jwtToken = generateAuthToken(tokenId);
        const credentials = {
          userId: fetchEmployee[0].userid,
          isValid: true,
        };
        await setAsync(tokenId, JSON.stringify(credentials));
        return {
          statusCode: 200,
          message: 'Login Successfull',
          data: {
            id: fetchEmployee[0].userid,
            jwt: jwtToken,
          },
        };
      } else {
        return Boom.unauthorized('Invalid Credentials');
      }
    } else {
      return Boom.unauthorized('Invalid Credentials');
    }
  } catch (e) {
    return Boom.badImplementation(e.message);
  }
};

exports.loginHandler = loginHandler;

// eslint-disable-next-line require-jsdoc
function generateAuthToken(tokenId) {
  const jwtPayload = {
    tokenId,
  };

  return jwt.sign(jwtPayload, JWT_SECRET, {
    expiresIn: '30 days',
  });
}
