"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rate_limit_1 = __importDefault(require("../config/rate.limit"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const active_middleware_1 = require("../middleware/active.middleware");
const userProfile_controller_1 = require("../controller/userProfile.controller");
const multer_config_1 = __importDefault(require("../config/multer.config"));
const userProfileRouter = (0, express_1.Router)();
userProfileRouter.get('/profile', rate_limit_1.default, auth_middleware_1.verifyAuthenticated, active_middleware_1.activeMiddleware, userProfile_controller_1.getUserProfile);
userProfileRouter.patch('/profile/activate', rate_limit_1.default, auth_middleware_1.verifyAuthenticated, userProfile_controller_1.activateProfile);
userProfileRouter.patch('/profile/deactivate', rate_limit_1.default, auth_middleware_1.verifyAuthenticated, active_middleware_1.activeMiddleware, userProfile_controller_1.deactivatedProfile);
userProfileRouter.patch('/profile', rate_limit_1.default, auth_middleware_1.verifyAuthenticated, active_middleware_1.activeMiddleware, userProfile_controller_1.updateProfile);
userProfileRouter.post('/profile/photo', rate_limit_1.default, auth_middleware_1.verifyAuthenticated, active_middleware_1.activeMiddleware, multer_config_1.default.single('photo'), userProfile_controller_1.uploadProfile);
userProfileRouter.get('/profile/search', rate_limit_1.default, auth_middleware_1.verifyAuthenticated, active_middleware_1.activeMiddleware, userProfile_controller_1.searchUser);
userProfileRouter.patch('/profile/edit', rate_limit_1.default, auth_middleware_1.verifyAuthenticated, active_middleware_1.activeMiddleware, userProfile_controller_1.editProfile);
userProfileRouter.post('/profile/follow/:userId', rate_limit_1.default, auth_middleware_1.verifyAuthenticated, active_middleware_1.activeMiddleware, userProfile_controller_1.followUser);
exports.default = userProfileRouter;
//# sourceMappingURL=userProfile.route.js.map