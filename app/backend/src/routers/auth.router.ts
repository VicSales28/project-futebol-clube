import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import TokenMiddleware from '../middlewares/token.middleware';

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
  '/',
  AuthMiddleware.checkRequiredFields,
  (req, res) => authController.authenticate(req, res),
);

authRouter.get(
  '/role',
  TokenMiddleware.checkToken,
  (req, res) => authController.getUserRole(req, res),
);

export default authRouter;
