import { Request, Router, Response } from 'express';
import LeaderboardController from '../controllers/leaderboard.controller';

const router = Router();

const leaderboardController = new LeaderboardController();

router.get('/home', (req: Request, res: Response) => leaderboardController.getRankHome(req, res));
router.get('/away', (req: Request, res: Response) => leaderboardController.getRankAway(req, res));

export default router;
