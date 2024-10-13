import { User } from '../database/entity/User.entity';
import { UserProfile } from '../database/entity/UserProfile.entity';
import { NextFunction, Request, Response } from 'express';
import { BadRequestException, UnAuthorizedException } from '../exceptions';
import { createLogger } from '../libs/logger';

const activeLogger = createLogger('active-logger');

export const activeMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.user;
  const userId = userData.id;
  if (!userData) {
    throw new UnAuthorizedException(null, 'User is not Authenticated');
  }

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      relations: {
        userProfile: true,
      },
    });

    const userStatus = user?.userProfile.status;
    console.log(userStatus);
    if (userStatus) {
      activeLogger.info('User is Active');
      next();
    } else {
      activeLogger.info('User is De-Activated');
      throw new UnAuthorizedException(null, 'Please Activate Your Account');
    }
  } catch (err) {
    console.log(err);
    throw new BadRequestException(null, 'Error in the Active Middleware');
  }
};
