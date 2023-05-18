import dotenv from 'dotenv';
dotenv.config({path: '.env'});
import UnAuthorizedException from "@/global/error/exceptions/unAuthorizedException";
import { RequestHandler } from "express";

const ALLOWED_API_KEYS = process.env.ALLOWED_API_KEYS?.split('\n') ?? [];

export const authClient: RequestHandler = (req, res, next) => {
  const { 'x-api-key': API_KEY_REQUEST } = req.headers;
  if (
    typeof API_KEY_REQUEST !== 'string'
    || ALLOWED_API_KEYS.indexOf(API_KEY_REQUEST) < 0
  ) {
    return next(new UnAuthorizedException());
  }
  // pass
  next();
}