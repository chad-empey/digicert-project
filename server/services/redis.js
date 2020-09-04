const redis = require("redis");

const redisClient = redis.createClient({
  url: process.env.REDIS_URL,
  password: process.env.REDIS_PASSWORD,
});

redisClient.on("connect", () => console.log("Redis is connected."));

module.exports = redisClient;
