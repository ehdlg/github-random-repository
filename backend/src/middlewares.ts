import { ErrorRequestHandler, RequestHandler } from 'express';

export const notFound: RequestHandler = (req, res, next) => {
  res.status(404).json('Not found');
};

export const handleError: ErrorRequestHandler = (error, req, res, next) => {
  const message = error.message ?? 'Something went wrong';
  const status = error.status ?? 500;

  return res.status(status).json(message);
};
