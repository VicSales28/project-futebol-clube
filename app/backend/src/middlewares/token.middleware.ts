import { NextFunction, Request, Response } from 'express';
import JWTUtility from '../utils/JWTUtility';
import getAccessToken from '../utils/getAcessToken';

class TokenMiddleware {
  static checkToken(req: Request, res: Response, next: NextFunction): Response | void {
    try {
      const tokenWithBearer = req.header('authorization');

      if (!tokenWithBearer) {
        return res.status(401).json({ message: 'Token not found' });
      }

      const token = getAccessToken(tokenWithBearer);

      const verification = JWTUtility.verify(token);

      console.log(verification);

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}

export default TokenMiddleware;
