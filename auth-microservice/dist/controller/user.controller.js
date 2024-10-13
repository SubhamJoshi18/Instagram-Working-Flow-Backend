"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const auth_service_1 = __importDefault(require("../services/auth.service"));
const registerUser = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await auth_service_1.default.registerUser(data);
        return res.status(201).json({
            message: 'User Register SuccessFully',
        });
    }
    catch (err) {
        next(err);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    try {
        const body = req.body;
        const data = await auth_service_1.default.loginUser(body);
        return res.status(201).json({
            message: `Logged In Succesfully`,
            data,
        });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=user.controller.js.map