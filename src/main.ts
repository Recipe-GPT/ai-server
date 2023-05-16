import dotenv  from 'dotenv';
import express from "express";
import controller from '@/global/controller/controller';
import { exceptionHandler, pathExceptionHandler } from '@/global/error/exceptionHandler';

dotenv.config({path: '.env'});
const app = express();

app.use('/', controller);
app.use(exceptionHandler);
app.use(pathExceptionHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`started server on http://127.0.0.1:${PORT}`);
});