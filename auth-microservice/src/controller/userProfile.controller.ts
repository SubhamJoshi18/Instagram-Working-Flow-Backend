import { NextFunction, Request, Response } from 'express';
import { UserProfile } from '../database/entity/UserProfile.entity';
import { User } from '../database/entity/User.entity';
import { createLogger } from '../libs/logger';
import { DatabaseException } from '../exceptions';
import userProfileService from '../services/userProfile.service';
import { IEditProfile, IUpdateBody } from '../interfaces/updates';

const userProfileLogger = createLogger('user-profile');

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;
    const result = await userProfileService.getProfile(userId);
    return res.status(201).json({
      message: `${result.username} Profile Fetches`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const activateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;
    const result = await userProfileService.activateProfile(userId);
    return res.status(201).json({
      message: 'User Profile is Updated Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const deactivatedProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;
    const result = await userProfileService.deactivateProfile(userId);
    return res.status(201).json({
      message: 'User is De activated Successfully',
    });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;

    const data: Partial<IUpdateBody> = req.body;
    const result = await userProfileService.updateProfile(userId, data);
    return res.status(201).json({
      message: 'Updated Profile',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const uploadProfile = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imageContent = req.file;
    console.log(imageContent);
  } catch (err) {
    next(err);
  }
};

export const searchUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.userId;
    const { username } = req.query;
    const response = await userProfileService.searchUser(
      userId,
      username as string
    );
    return res.status(201).json({
      message: 'Search Users',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const editProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data: IEditProfile = req.body;
    const userId = req.user.userId;
    const response = await userProfileService.editProfile(userId, data);
    return res.status(201).json({
      message: 'Profile Edited Successfully',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const followUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;
    const response = await userProfileService.followUser(Number(userId));
    return res.status(201).json({
      message: 'User Followed',
    });
  } catch (err) {
    next(err);
  }
};
