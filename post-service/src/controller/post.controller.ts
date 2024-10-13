import { NextFunction, Request, Response } from 'express';
import { ICreatePost } from '../interfaces';
import PostService from '../services/post.service';

export const postController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;
    const data: ICreatePost = req.body;
    const result = await PostService.createPost(data, userId);

    return res.status(201).json({
      message: 'Post is added Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await PostService.getAllPost();
    return res.status(201).json({
      message: 'All Post has been Fetches',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
export const getUserPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;
    const response = await PostService.getPostById(userId);
    return res.status(201).json({
      message: 'User Posts',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const filterPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, created_at } = req.query;
    const response = await PostService.filterPost(title as string);
    return res.status(201).json({
      message: 'Filtered Post',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
