import { NextFunction, Request, Response } from 'express';
import { IRegisterBody } from '../interfaces/register';
import AuthService from '../services/auth.service';
import { ILoginBody } from '../interfaces/login';

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: IRegisterBody = req.body;
    const result = await AuthService.registerUser(data);
    return res.status(201).json({
      message: 'User Register SuccessFully',
    });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const body: ILoginBody = req.body;
    const data = await AuthService.loginUser(body);
    return res.status(201).json({
      message: `Logged In Succesfully`,
      data,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
