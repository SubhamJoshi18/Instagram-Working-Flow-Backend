"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followUser = exports.editProfile = exports.searchUser = exports.uploadProfile = exports.updateProfile = exports.deactivatedProfile = exports.activateProfile = exports.getUserProfile = void 0;
const logger_1 = require("../libs/logger");
const userProfile_service_1 = __importDefault(require("../services/userProfile.service"));
const userProfileLogger = (0, logger_1.createLogger)('user-profile');
const getUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const result = await userProfile_service_1.default.getProfile(userId);
        return res.status(201).json({
            message: `${result.username} Profile Fetches`,
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getUserProfile = getUserProfile;
const activateProfile = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const result = await userProfile_service_1.default.activateProfile(userId);
        return res.status(201).json({
            message: 'User Profile is Updated Successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.activateProfile = activateProfile;
const deactivatedProfile = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const result = await userProfile_service_1.default.deactivateProfile(userId);
        return res.status(201).json({
            message: 'User is De activated Successfully',
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deactivatedProfile = deactivatedProfile;
const updateProfile = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const data = req.body;
        const result = await userProfile_service_1.default.updateProfile(userId, data);
        return res.status(201).json({
            message: 'Updated Profile',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateProfile = updateProfile;
const uploadProfile = (req, res, next) => {
    try {
        const imageContent = req.file;
        console.log(imageContent);
    }
    catch (err) {
        next(err);
    }
};
exports.uploadProfile = uploadProfile;
const searchUser = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const { username } = req.query;
        const response = await userProfile_service_1.default.searchUser(userId, username);
        return res.status(201).json({
            message: 'Search Users',
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.searchUser = searchUser;
const editProfile = async (req, res, next) => {
    try {
        const data = req.body;
        const userId = req.user.userId;
        const response = await userProfile_service_1.default.editProfile(userId, data);
        return res.status(201).json({
            message: 'Profile Edited Successfully',
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.editProfile = editProfile;
const followUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const response = await userProfile_service_1.default.followUser(Number(userId));
        return res.status(201).json({
            message: 'User Followed',
        });
    }
    catch (err) {
        next(err);
    }
};
exports.followUser = followUser;
//# sourceMappingURL=userProfile.controller.js.map