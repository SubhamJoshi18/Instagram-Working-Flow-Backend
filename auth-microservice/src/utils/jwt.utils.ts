import jwt from 'jsonwebtoken';

interface IPayload {
  username: string;
  email: string;
  userId: number;
}

class JWTUtils {
  static async createAccessToken(data: IPayload) {
    const userData = { ...data };
    const options = {
      issuer: 'instagram-clone',
      expiresIn: '1h',
    };
    return new Promise((resolve, reject) => {
      if (Object.entries(data).length > 0) {
        jwt.sign(userData, 'random', options, (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        });
      }
    });
  }
}


export default JWTUtils