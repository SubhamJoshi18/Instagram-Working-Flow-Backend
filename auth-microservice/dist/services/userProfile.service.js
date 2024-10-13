"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../libs/logger");
const exceptions_1 = require("../exceptions");
const User_entity_1 = require("../database/entity/User.entity");
const UserProfile_entity_1 = require("../database/entity/UserProfile.entity");
const userProfileLogger = (0, logger_1.createLogger)('user-profile');
class UserProfileService {
    async getProfile(userId) {
        const currentUser = await User_entity_1.User.findOne({
            where: {
                id: userId,
            },
            relations: {
                userProfile: true,
            },
        });
        if (!currentUser?.userProfile) {
            userProfileLogger.info('User Profile does not exists');
            throw new exceptions_1.DatabaseException(null, 'User Profile does not exists');
        }
        return currentUser;
    }
    async activateProfile(userId) {
        const user = await User_entity_1.User.findOne({
            where: {
                id: userId,
            },
            relations: {
                userProfile: true,
            },
        });
        if (!user) {
            throw new exceptions_1.DatabaseException(null, 'User does not exist');
        }
        if (user.userProfile.status === true) {
            throw new exceptions_1.DatabaseException(null, 'User is already activated');
        }
        user.userProfile.status = true;
        await user.userProfile.save();
        userProfileLogger.info('User is Activated Successfully');
        return true;
    }
    async deactivateProfile(userId) {
        const user = await User_entity_1.User.findOne({
            where: {
                id: userId,
            },
            relations: {
                userProfile: true,
            },
        });
        if (!user) {
            throw new exceptions_1.DatabaseException(null, 'User Profile does not exist');
        }
        const userStatus = user.userProfile.status === true;
        console.log('This is the user status:', userStatus);
        if (!userStatus) {
            throw new exceptions_1.DatabaseException(null, 'User is already deactivated');
        }
        user.userProfile.status = false;
        await user.userProfile.save();
        userProfileLogger.info('Account is deactivated successfully');
        return true;
    }
    async updateProfile(userId, body) {
        const user = await User_entity_1.User.findOne({
            where: {
                id: userId,
            },
            relations: {
                userProfile: true,
            },
        });
        if (!user) {
            throw new exceptions_1.DatabaseException(null, 'Database Caught An Error');
        }
        await User_entity_1.User.createQueryBuilder()
            .update(User_entity_1.User)
            .set({ ...body })
            .execute();
    }
    async searchUser(userId, username) {
        const user = await User_entity_1.User.find({
            where: {
                id: userId,
            },
            relations: {
                userProfile: true,
            },
        });
        const checkUser = user.length === 0;
        if (checkUser) {
            throw new exceptions_1.DatabaseException(null, 'User does not exists you requested');
        }
        const matchedUser = user.filter((item) => item.username && item.username === username);
        return matchedUser;
    }
    async editProfile(userId, data) {
        const user = await User_entity_1.User.findOne({
            where: {
                id: userId,
            },
            relations: {
                userProfile: true,
            },
        });
        const userProfile = await UserProfile_entity_1.UserProfile.findOne({
            where: {
                user: user?.id,
            },
            relations: {
                user: true,
            },
        });
        if (Object.entries(data).length === 0) {
            throw new exceptions_1.DatabaseException(null, 'Update Operation is Empty');
        }
        await UserProfile_entity_1.UserProfile.createQueryBuilder()
            .update(UserProfile_entity_1.UserProfile)
            .set({
            ...data,
        })
            .where('user = :user ', { user: user?.id })
            .execute();
        return true;
    }
    async followUser(userId) {
        const findUser = await User_entity_1.User.findOne({
            where: {
                id: userId,
            },
            relations: {
                userProfile: true,
            },
        });
        const userProfile = await UserProfile_entity_1.UserProfile.findOne({
            where: {
                user: findUser?.id,
            },
            relations: {
                user: true,
            },
        });
        console.log(userProfile);
    }
}
exports.default = new UserProfileService();
//# sourceMappingURL=userProfile.service.js.map