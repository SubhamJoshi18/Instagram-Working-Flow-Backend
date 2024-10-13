import { Router } from 'express';
import {
  getUserPost,
  getPosts,
  postController,
} from '../controller/post.controller';
import { verifyAuthenticated } from '../middleware/auth.middleware';
import limiter from '../config/limiter.config';
import { activeMiddleware } from '../middleware/active.middleware';

const postRouter = Router();

postRouter.post(
  '/create',
  limiter,
  verifyAuthenticated,
  activeMiddleware,
  postController as any
);

postRouter.get(
  '/get',
  limiter,
  verifyAuthenticated,
  activeMiddleware,
  getPosts as any
);

postRouter.get(
  '/user',
  limiter,
  verifyAuthenticated,
  activeMiddleware,
  getUserPost as any
);


postRouter.get('/filter',limiter,verifyAuthenticated,activeMiddleware)


export default postRouter;
