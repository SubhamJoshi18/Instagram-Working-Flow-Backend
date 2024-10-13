import express, { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import serverRouter from './router/server.route';
import { createLogger } from './libs/logger';
import { errorMiddleware } from './middleware';
import AppDataSource from './database/connect';
import { DataSource } from 'typeorm';
dotenv.config();

const app = express();
const port = process.env.USER_SERVER_PORT || 3000;
const expressLogger = createLogger('express-logger');

app.use(express.json({}));

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
  try {
    expressLogger.info(`User Auth is running on the http://localhost:${port}`);
  } catch (err) {
    expressLogger.error('Error in starting the Auth Server');
  }
});
