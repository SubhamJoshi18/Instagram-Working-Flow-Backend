import express from 'express';
import dotenv from 'dotenv';
import serverRouter from './router/server.router';
import { createLogger } from './libs/logger';
import { errorMiddleware } from './middleware/errorMiddleware';
import AppDataSource from './database/connect';
import { DataSource } from 'typeorm';

dotenv.config();

const expressLogger = createLogger('express-logger');
const app = express();
const port = process.env.SERVER_PORT || 3002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async () => {
  await AppDataSource.initialize()
    .then((db: DataSource) => {
      expressLogger.info(
        `Initialized '${db.options.database}' database successfully`
      );
    })
    .catch((err: Error) => {
      expressLogger.error('Error while intializing database. Error: ' + err);
      process.exit(0);
    });
})();

app.use(serverRouter);

app.use(errorMiddleware as any);

app.listen(port, () => {
  expressLogger.info(`Server is running on the http://localhost:${port}`);
});
