"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controller/user.controller");
const rate_limit_1 = __importDefault(require("../config/rate.limit"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', rate_limit_1.default, user_controller_1.registerUser);
authRouter.post('/login', rate_limit_1.default, user_controller_1.loginUser);
exports.default = authRouter;
//# sourceMappingURL=auth.route.js.map