import { Router } from 'express';
import { loginUser, registerUser } from '../controller/user.controller';
import limiter from '../config/rate.limit';

const authRouter = Router();

authRouter.post('/register', limiter, registerUser as any);
authRouter.post('/login', limiter, loginUser as any);

export default authRouter;
