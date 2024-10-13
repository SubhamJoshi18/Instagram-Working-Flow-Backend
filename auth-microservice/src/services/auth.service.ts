import { User } from '../database/entity/User.entity';
import { BadRequestException, DatabaseException } from '../exceptions';
import { IRegisterBody } from '../interfaces/register';
import bcrypt from 'bcrypt';
import userSchema from '../validation/register';
import { ILoginBody } from '../interfaces/login';
import { channel } from 'diagnostics_channel';
import JWTUtils from '../utils/jwt.utils';
import { UserProfile } from '../database/entity/UserProfile.entity';

class AuthService {
  async registerUser(data: IRegisterBody): Promise<any> {
    const { error, value } = userSchema.validate(data);

    if (error) {
      throw new BadRequestException(null, error.message);
    }

    const checkEmail = await User.findOne({
      where: {
        email: data.email,
        username: data.username,
      },
    });

    if (checkEmail) {
      throw new DatabaseException(null, 'Email or Username already exists');
    }

    const genSalt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(data.password, genSalt);

    const newUser = User.create({
      username: data.username,
      email: data.email,
      password: hashPassword,
    });

    const result = await newUser.save();
    console.log('This is a result', result);

    const userprofile = UserProfile.create({
      user: result.id as any,
    });

    userprofile.status = true;

    await userprofile.save();

    return result;
  }

  async loginUser(data: ILoginBody): Promise<any> {
    const { email, password } = data;
    const checkEmail = await User.findOne({
      where: {
        email: email,
      },
    });

    if (!checkEmail) {
      throw new DatabaseException(
        null,
        'Email Does not exists in the database'
      );
    }

    const userPassword = checkEmail.hasId() ? checkEmail.password : '';
    if (userPassword.length === 0) {
      throw new DatabaseException(null, 'User Does not have ID');
    }

    const checkPassword = await bcrypt.hash(password, userPassword);
    if (typeof checkPassword && !checkPassword) {
      throw new DatabaseException(null, 'Password Does not Match');
    }

    const userData = {
      ...checkEmail,
      userId: checkEmail.id,
    };
    const accessToken = await JWTUtils.createAccessToken(userData);
    return {
      accessToken,
      userId: checkEmail.id,
      username: checkEmail.username,
    };
  }
}

export default new AuthService();
