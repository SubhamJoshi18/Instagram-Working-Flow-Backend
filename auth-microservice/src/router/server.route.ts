import { Router } from 'express';
import authRouter from './auth.route';
import userProfileRouter from './userProfile.route';
const serverRouter = Router();

serverRouter.use('/auth', [authRouter, userProfileRouter]);

export default serverRouter;
