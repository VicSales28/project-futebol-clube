import * as jwt from 'jsonwebtoken';
import { verify, JwtPayload, decode } from 'jsonwebtoken';
import { UserPayload } from '../Interfaces/types/UserPayload';

class JWTUtility {
  private static jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

  static sign(payload: UserPayload): string {
    return jwt.sign(payload, this.jwtSecret);
  }

  static verify(token: string): JwtPayload | string {
    return verify(token, this.jwtSecret) as JwtPayload;
  }

  static decode(token: string): JwtPayload {
    return decode(token) as JwtPayload;
  }
}

export default JWTUtility;
