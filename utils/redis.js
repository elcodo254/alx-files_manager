const redis = require('redis');
const { promisify } = require('util');
// class to create a client to redis
class RedisClient {
  constructor() {
    this.client = redis.createClient();
    this.getAsync = promisify(this.client.get).bind(this.client);

    this.client.on('error', (error) => {
      console.log(`Redis client not connected to the server: ${error.message}`);
    });
  }

  // connection to redis validator
  isAlive() {
    return this.client.connected;
  }

  // getter
  async get(key) {
    const value = await this.getAsync(key);
    return value;
  }

  // setter
  async set(key, value, duration) {
    this.client.set(key, value);
    this.client.expire(key, duration);
  }

  // delete function
  async del(key) {
    this.client.del(key);
  }
}

const redisClient = new RedisClient();
export default redisClient;
