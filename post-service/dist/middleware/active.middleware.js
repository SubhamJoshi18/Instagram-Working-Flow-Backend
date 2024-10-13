"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activeMiddleware = void 0;
const User_entity_1 = require("../database/entity/User.entity");
const exceptions_1 = require("../exceptions");
const logger_1 = require("../libs/logger");
const activeLogger = (0, logger_1.createLogger)('active-logger');
const activeMiddleware = async (req, res, next) => {
    const userData = req.user;
    const userId = userData.id;
    if (!userData) {
        throw new exceptions_1.UnAuthorizedException(null, 'User is not Authenticated');
    }
    try {
        const user = await User_entity_1.User.findOne({
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
        }
        else {
            activeLogger.info('User is De-Activated');
            throw new exceptions_1.UnAuthorizedException(null, 'Please Activate Your Account');
        }
    }
    catch (err) {
        console.log(err);
        throw new exceptions_1.BadRequestException(null, 'Error in the Active Middleware');
    }
};
exports.activeMiddleware = activeMiddleware;
//# sourceMappingURL=active.middleware.js.map