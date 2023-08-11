import { Request, Router, Response } from 'express';
import MatchController from '../controllers/match.controller';

const matchController = new MatchController();

const router = Router();

router.get('/', (req: Request, res: Response) => matchController.findAll(req, res));

export default router;
