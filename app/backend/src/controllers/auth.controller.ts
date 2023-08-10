import { Request, Response } from 'express';
import AuthService from '../services/auth.service';
import { IUser } from '../Interfaces/users/IUser';

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

  getUserRole = async (_req: Request, res: Response) =>
    res.status(200).json({ role: res.locals.user.role });
}

export default AuthController;
