import { NextFunction, Request, Response } from 'express';

class AuthMiddleware {
  static checkRequiredFields(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    const regex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;

    if (!regex.test(email) || password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }
}

export default AuthMiddleware;
