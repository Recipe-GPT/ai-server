import InternalServerException from '@/global/error/exceptions/internalServerException';
import NotFoundException from '@/global/error/exceptions/notFoundException';
import GeneralException from '@/global/error/generalException';
import { Request, Response, NextFunction } from 'express';

const exceptionHandler = (
  err: GeneralException | Error,
  req: Request,
  res: Response,
  next: NextFunction): void => {
  if (err instanceof GeneralException) {
    if (err.statusCode === 500) {
      console.error(err);
    }
    res.status(err.statusCode).json(err).end();
    return;
  }
  console.error(err);
  res.status(500).json(new InternalServerException());
};

const pathExceptionHandler = (
  req: Request,
  res: Response,
  next: NextFunction): void => {
  res.status(404).json(new NotFoundException());
};

export {
  exceptionHandler,
  pathExceptionHandler
};