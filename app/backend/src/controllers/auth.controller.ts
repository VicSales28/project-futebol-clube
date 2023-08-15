import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { IUser } from '../Interfaces/users/IUser';
import JWTUtility from '../utils/JWTUtility';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import getAccessToken from '../utils/getAcessToken';

class AuthController {
  private authService = new AuthService();

  async authenticate(req: Request, res: Response) {
    const { email, password } = req.body as IUser;
    const token = await this.authService.authenticate(email, password);

    if (!token) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    return res.status(200).json({ token });
  }

  async getUserRole(req: Request, res: Response): Promise<Response> {
    const tokenWithBearer = req.header('authorization');

    if (!tokenWithBearer) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const token = getAccessToken(tokenWithBearer);

    const user = JWTUtility.decode(token);

    const serviceResponse = await this.authService.getUserRole(user.email);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }
}

export default AuthController;
