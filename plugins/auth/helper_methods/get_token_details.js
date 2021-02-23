const { promisify } = require("util");
const redis = require("redis");
const client = redis.createClient();
getAsync = promisify(client.get).bind(client);

client.on("error", function(error) {
    console.error(error);
  });
