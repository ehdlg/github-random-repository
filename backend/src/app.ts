import express from 'express';
import 'dotenv/config';
import { client, checkRedisConnection } from './db';
import { handleError, notFound, validateRepositoriesInput } from './middlewares';

const app = express();
const { PORT } = process.env;

app.use(express.json());

app.get('/', (req, res, next) => {
  res.json('Welcome to the Redis Backend');
});

app.get('/:language', async (req, res, next) => {
  const { language } = req.params;

  try {
    const repos = await client.get(language);

    return res.json(repos);
  } catch (error) {
    next(error);
  }
});

app.post('/', validateRepositoriesInput, async (req, res, next) => {
  const { language, repositories } = req.body;

  try {
    await client.set(language, JSON.stringify(repositories), { EX: 60 * 60 * 24 }); //Expires in 24h

    return res.status(201).json('OK');
  } catch (error) {
    next(error);
  }
});

app.use(notFound);

app.use(handleError);

app.listen(PORT, async () => {
  try {
    await checkRedisConnection();

    console.log(`Listening on http://localhost:${PORT}`);
  } catch (error) {
    console.error('There was an error connecting to the Redis database');
  }
});
