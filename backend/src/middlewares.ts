import { ErrorRequestHandler, RequestHandler } from 'express';
import { CustomError } from './errors';

export const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json('Not found');
};

export const handleError: ErrorRequestHandler = (error, req, res, next) => {
  const message = error.message ?? 'Something went wrong';
  const status = error.status ?? 500;

  return res.status(status).json({ error: message });
};

export const validateRepositoriesInput: RequestHandler = (req, res, next) => {
  const { repositories } = req.body;

  if (null == repositories) throw new CustomError('No repositories were sent', 400);

  try {
    if (Array.isArray(repositories)) return next();

    throw new CustomError('Invalid repositories', 400);
  } catch {
    const error = new CustomError('Invalid repositories', 404);
    throw error;
  }
};
