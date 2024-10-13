import { createLogger } from '../libs/logger';
import { DatabaseException } from '../exceptions';
import { User } from '../database/entity/User.entity';
import { IEditProfile, IUpdateBody } from '../interfaces/updates';
import { UserProfile } from '../database/entity/UserProfile.entity';
import { any } from 'joi';
const userProfileLogger = createLogger('user-profile');
class UserProfileService {
  async getProfile(userId: number) {
    const currentUser = await User.findOne({
      where: {
        id: userId,
      },
      relations: {
        userProfile: true,
      },
    });

    if (!currentUser?.userProfile) {
      userProfileLogger.info('User Profile does not exists');
      throw new DatabaseException(null, 'User Profile does not exists');
    }
    return currentUser;
  }
  async activateProfile(userId: number) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      relations: {
        userProfile: true,
      },
    });

    if (!user) {
      throw new DatabaseException(null, 'User does not exist');
    }

    if (user.userProfile.status === true) {
      throw new DatabaseException(null, 'User is already activated');
    }

    user.userProfile.status = true;

    await user.userProfile.save();

    userProfileLogger.info('User is Activated Successfully');

    return true;
  }

  async deactivateProfile(userId: number) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      relations: {
        userProfile: true,
      },
    });

    if (!user) {
      throw new DatabaseException(null, 'User Profile does not exist');
    }

    const userStatus = user.userProfile.status === true;
    console.log('This is the user status:', userStatus);

    if (!userStatus) {
      throw new DatabaseException(null, 'User is already deactivated');
    }

    user.userProfile.status = false;

    await user.userProfile.save();

    userProfileLogger.info('Account is deactivated successfully');

    return true;
  }

  async updateProfile(userId: number, body: Partial<IUpdateBody>) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      relations: {
        userProfile: true,
      },
    });

    if (!user) {
      throw new DatabaseException(null, 'Database Caught An Error');
    }

    await User.createQueryBuilder()
      .update(User)
      .set({ ...body })
      .execute();
  }

  async searchUser(userId: number, username: string) {
    const user = await User.find({
      where: {
        id: userId,
      },
      relations: {
        userProfile: true,
      },
    });

    const checkUser = user.length === 0;
    if (checkUser) {
      throw new DatabaseException(null, 'User does not exists you requested');
    }

    const matchedUser = user.filter(
      (item) => item.username && item.username === username
    );

    return matchedUser;
  }

  async editProfile(userId: number, data: Partial<IEditProfile>) {
    const user = await User.findOne({
      where: {
        id: userId,
      },
      relations: {
        userProfile: true,
      },
    });

    const userProfile = await UserProfile.findOne({
      where: {
        user: user?.id as any,
      },
      relations: {
        user: true,
      },
    });

    if (Object.entries(data).length === 0) {
      throw new DatabaseException(null, 'Update Operation is Empty');
    }

    await UserProfile.createQueryBuilder()
      .update(UserProfile)
      .set({
        ...(data as any),
      })
      .where('user = :user ', { user: user?.id })
      .execute();

    return true;
  }

  async followUser(userId: number) {
    const findUser = await User.findOne({
      where: {
        id: userId,
      },
      relations: {
        userProfile: true,
      },
    });

    const userProfile = await UserProfile.findOne({
      where: {
        user: findUser?.id as any,
      },
      relations: {
        user: true,
      },
    });

     userProfile?.follower = 
  }
}

export default new UserProfileService();
