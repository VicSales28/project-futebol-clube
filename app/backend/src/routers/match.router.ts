import { Request, Router, Response } from 'express';
import MatchController from '../controllers/match.controller';
import TokenMiddleware from '../middlewares/token.middleware';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.findAll(req, res));

router.patch(
  '/:id/finish',
  TokenMiddleware.checkToken,
  (req: Request, res: Response) => matchController.markMatchAsFinished(req, res),
);

export default router;
