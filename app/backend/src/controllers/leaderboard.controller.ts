import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  private leaderboardService = new LeaderboardService();

  public async getRankHome(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getRankHome();

    return res.status(200).json(serviceResponse);
  }

  public async getRankAway(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getRankAway();

    return res.status(200).json(serviceResponse);
  }

  getRankAll = (_req: Request, res: Response) => res
    .status(501).json({ error: 'This search has not been implemented yet' });
}

export default LeaderboardController;
