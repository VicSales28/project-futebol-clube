import * as jwt from 'jsonwebtoken';
import { UserPayload } from '../Interfaces/types/UserPayload';

class JWTUtility {
  private jwtSecret = process.env.JWT_SECRET || 'jwt_secret';

  sign(payload: UserPayload): string {
    return jwt.sign(payload, this.jwtSecret);
  }
}

export default JWTUtility;
