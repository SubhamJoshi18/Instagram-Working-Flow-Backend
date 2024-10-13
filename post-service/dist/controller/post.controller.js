"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostById = exports.getPosts = exports.postController = void 0;
const post_service_1 = __importDefault(require("../services/post.service"));
const postController = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const data = req.body;
        const result = await post_service_1.default.createPost(data, userId);
        return res.status(201).json({
            message: 'Post is added Successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.postController = postController;
const getPosts = async (req, res, next) => {
    try {
        const response = await post_service_1.default.getAllPost();
        return res.status(201).json({
            message: 'All Post has been Fetches',
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getPosts = getPosts;
const getPostById = async (req, res, next) => {
    try {
        const userId = req.user.userId;
        const response = await post_service_1.default.getPostById(userId);
        return res.status(201).json({
            message: 'User Posts',
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getPostById = getPostById;
//# sourceMappingURL=post.controller.js.map