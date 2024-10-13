"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = __importDefault(require("./auth.route"));
const userProfile_route_1 = __importDefault(require("./userProfile.route"));
const serverRouter = (0, express_1.Router)();
serverRouter.use('/auth', [auth_route_1.default, userProfile_route_1.default]);
exports.default = serverRouter;
//# sourceMappingURL=server.route.js.map