import { NextFunction, Request, Response } from 'express';
import JWTUtility from '../utils/JWTUtility';

class TokenMiddleware {
  // Função auxiliar para obter o token sem o prefixo "Bearer"
  private static getAccessToken = (tokenWithBearer: string) => {
    const splitted = tokenWithBearer.split(' ');
    return splitted[splitted.length - 1];
  };

  static checkToken = (req: Request, res: Response, next: NextFunction) => {
    try {
      const tokenWithBearer = req.header('authorization');

      console.log(tokenWithBearer);

      if (!tokenWithBearer) {
        return res.status(401).json({ message: 'Token not found' });
      }

      const JWT = new JWTUtility();

      const token = TokenMiddleware.getAccessToken(tokenWithBearer);

      const verified = JWT.verify(token);

      res.locals.user = verified;

      console.log(verified);

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  };
}

export default TokenMiddleware;
