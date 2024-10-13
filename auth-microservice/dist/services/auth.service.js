"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_entity_1 = require("../database/entity/User.entity");
const exceptions_1 = require("../exceptions");
const bcrypt_1 = __importDefault(require("bcrypt"));
const register_1 = __importDefault(require("../validation/register"));
const jwt_utils_1 = __importDefault(require("../utils/jwt.utils"));
const UserProfile_entity_1 = require("../database/entity/UserProfile.entity");
class AuthService {
    async registerUser(data) {
        const { error, value } = register_1.default.validate(data);
        if (error) {
            throw new exceptions_1.BadRequestException(null, error.message);
        }
        const checkEmail = await User_entity_1.User.findOne({
            where: {
                email: data.email,
                username: data.username,
            },
        });
        if (checkEmail) {
            throw new exceptions_1.DatabaseException(null, 'Email or Username already exists');
        }
        const genSalt = bcrypt_1.default.genSaltSync(10);
        const hashPassword = bcrypt_1.default.hashSync(data.password, genSalt);
        const newUser = User_entity_1.User.create({
            username: data.username,
            email: data.email,
            password: hashPassword,
        });
        const result = await newUser.save();
        console.log('This is a result', result);
        const userprofile = UserProfile_entity_1.UserProfile.create({
            user: result.id,
        });
        userprofile.status = true;
        await userprofile.save();
        return result;
    }
    async loginUser(data) {
        const { email, password } = data;
        const checkEmail = await User_entity_1.User.findOne({
            where: {
                email: email,
            },
        });
        if (!checkEmail) {
            throw new exceptions_1.DatabaseException(null, 'Email Does not exists in the database');
        }
        const userPassword = checkEmail.hasId() ? checkEmail.password : '';
        if (userPassword.length === 0) {
            throw new exceptions_1.DatabaseException(null, 'User Does not have ID');
        }
        const checkPassword = await bcrypt_1.default.hash(password, userPassword);
        if (typeof checkPassword && !checkPassword) {
            throw new exceptions_1.DatabaseException(null, 'Password Does not Match');
        }
        const userData = {
            ...checkEmail,
            userId: checkEmail.id,
        };
        const accessToken = await jwt_utils_1.default.createAccessToken(userData);
        return {
            accessToken,
            userId: checkEmail.id,
            username: checkEmail.username,
        };
    }
}
exports.default = new AuthService();
//# sourceMappingURL=auth.service.js.map