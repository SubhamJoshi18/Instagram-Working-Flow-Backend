"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JWTUtils {
    static async createAccessToken(data) {
        const userData = { ...data };
        const options = {
            issuer: 'instagram-clone',
            expiresIn: '1h',
        };
        return new Promise((resolve, reject) => {
            if (Object.entries(data).length > 0) {
                jsonwebtoken_1.default.sign(userData, 'random', options, (err, token) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(token);
                    }
                });
            }
        });
    }
}
exports.default = JWTUtils;
//# sourceMappingURL=jwt.utils.js.map