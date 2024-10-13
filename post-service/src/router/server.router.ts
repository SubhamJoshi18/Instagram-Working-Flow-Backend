import { Router } from 'express';
import postRouter from './post.router';

const serverRouter = Router();

serverRouter.use('/post', [postRouter]);

export default serverRouter;
