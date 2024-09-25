import { createClient } from 'redis';

const { REDIS_PWD, REDIS_HOST, REDIS_PORT } = process.env;

export const client = createClient({
  password: REDIS_PWD || undefined,
  socket: {
    host: REDIS_HOST || 'localhost',
    port: Number(REDIS_PORT) || 6379,
  },
});

export const checkRedisConnection = async () => {
  try {
    await client.connect();
  } catch (error) {
    throw error;
  }
};
