import { ErrorRequestHandler, RequestHandler } from 'express';
import { CustomError } from './errors';

export const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json('Not found');
};

export const handleError: ErrorRequestHandler = (error, req, res, next) => {
  const message = error.message ?? 'Something went wrong';
  const status = error.status ?? 500;

  return res.status(status).json(message);
};

export const validateRepositoriesInput = (repos: string) => {
  try {
    return JSON.parse(repos);
  } catch {
    const error = new CustomError('Invalid repositories', 404);
    throw error;
  }
};
