"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAuthenticated = void 0;
const exceptions_1 = require("../exceptions");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyAuthenticated = (req, res, next) => {
    try {
        const token = req.headers['authorization'] ?? req.headers.authorization;
        if (!token) {
            throw new exceptions_1.BadRequestException(null, 'Token does not exists , you are not authenticated');
        }
        const bearerToken = token.startsWith('B') ? token.split(' ')[1] : token;
        jsonwebtoken_1.default.verify(bearerToken, 'random', (error, payload) => {
            if (error) {
                throw new exceptions_1.BadRequestException(null, 'Token Does not match');
            }
            req.user = payload;
            next();
        });
    }
    catch (err) {
        throw new exceptions_1.BadRequestException(null, 'Error in the Bad Request Exceptions');
    }
};
exports.verifyAuthenticated = verifyAuthenticated;
//# sourceMappingURL=auth.middleware.js.map