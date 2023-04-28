import InternalServerException from '@/global/error/exceptions/internalServerException';
import GeneralException from '@/global/error/generalException';
import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

router.use((
  err: GeneralException | Error,
  req: Request,
  res: Response,
  next: NextFunction) => {
  if (err instanceof GeneralException) {
    if (err.statusCode === 500) {
      console.error(err);
    }
    res.status(err.statusCode).json(err).end();
    return;
  }
  console.error(err);
  res.status(500).json(new InternalServerException());
});

export default router;