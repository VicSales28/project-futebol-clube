import { NextFunction, Request, Response } from 'express';
import JWTUtility from '../utils/JWTUtility';

class TokenMiddleware {
  static checkToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenWithBearer = req.header('authorization');

      console.log(tokenWithBearer);

      if (!tokenWithBearer) {
        return res.status(401).json({ message: 'Token not found' });
      }

      const JWT = new JWTUtility();
      const verified = JWT.verify(tokenWithBearer);

      res.locals.user = verified;

      console.log(verified);

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default TokenMiddleware;
