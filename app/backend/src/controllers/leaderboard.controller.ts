import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  private leaderboardService = new LeaderboardService();

  public async getRankHome(_req: Request, res: Response) {
    const serviceResponse = await this.leaderboardService.getRankHome();

    return res.status(200).json(serviceResponse);
  }
}

export default LeaderboardController;
