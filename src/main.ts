import dotenv from 'dotenv';
dotenv.config({path: '.env'});
import express from 'express';
import controller from '@/global/controller/controller';
import { exceptionHandler, pathExceptionHandler } from '@/global/error/exceptionHandler';

import swaggerFile from './swagger/swagger-output.json';
import swaggerUi from 'swagger-ui-express';

const app = express();

app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerFile, { explorer: true }));
app.use(controller);
app.use(exceptionHandler);
app.use(pathExceptionHandler);

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`started server on http://127.0.0.1:${PORT}`);
});