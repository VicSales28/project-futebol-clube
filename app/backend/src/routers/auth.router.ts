import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import AuthMiddleware from '../middlewares/auth.middleware';

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
  '/',
  AuthMiddleware.checkRequiredFields,
  (req, res) => authController.authenticate(req, res),
);

export default authRouter;
