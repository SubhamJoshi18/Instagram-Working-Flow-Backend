"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_router_1 = __importDefault(require("./post.router"));
const serverRouter = (0, express_1.Router)();
serverRouter.use('/post', [post_router_1.default]);
exports.default = serverRouter;
//# sourceMappingURL=server.router.js.map