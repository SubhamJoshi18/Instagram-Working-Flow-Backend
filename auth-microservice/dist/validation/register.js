"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const userSchema = joi_1.default.object({
    username: joi_1.default.string().alphanum().min(3).max(30).required(),
    password: joi_1.default.string().min(8).required(),
    email: joi_1.default.string().email().required(),
});
exports.default = userSchema;
//# sourceMappingURL=register.js.map