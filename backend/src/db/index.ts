import { createClient } from 'redis';

export const client = createClient();

export const checkRedisConnection = async () => {
  try {
    await client.connect();
  } catch (error) {
    throw error;
  }
};
