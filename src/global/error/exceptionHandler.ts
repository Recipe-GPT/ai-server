import InternalServerException from '@/global/error/exceptions/internalServerException';
import NotFoundException from '@/global/error/exceptions/notFoundException';
import GeneralException from '@/global/error/generalException';
import { ErrorRequestHandler, RequestHandler } from 'express';

const exceptionHandler: ErrorRequestHandler = (err: GeneralException | Error, req, res, next): void => {
  if (err instanceof GeneralException) {
    if (err.statusCode === 500) {
      console.error(err);
    }
    res.status(err.statusCode).json(err);
    return;
  }
  console.error(err);
  res.status(500).json(new InternalServerException());
};

const pathExceptionHandler: RequestHandler = (req, res, next): void => {
  res.status(404).json(new NotFoundException());
};

export {
  exceptionHandler,
  pathExceptionHandler
};