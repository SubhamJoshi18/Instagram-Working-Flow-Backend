"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controller/post.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const limiter_config_1 = __importDefault(require("../config/limiter.config"));
const active_middleware_1 = require("../middleware/active.middleware");
const postRouter = (0, express_1.Router)();
postRouter.post('/create', limiter_config_1.default, auth_middleware_1.verifyAuthenticated, active_middleware_1.activeMiddleware, post_controller_1.postController);
postRouter.get('/get', limiter_config_1.default, auth_middleware_1.verifyAuthenticated, active_middleware_1.activeMiddleware, post_controller_1.getPosts);
postRouter.get('/user', limiter_config_1.default, auth_middleware_1.verifyAuthenticated, active_middleware_1.activeMiddleware, post_controller_1.getPostById);
exports.default = postRouter;
//# sourceMappingURL=post.router.js.map