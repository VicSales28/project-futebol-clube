import { Request, Response } from 'express';
import MatchService from '../services/match.service';

class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const serviceResponse = await this.matchService.findAll(inProgress as string | undefined);
    res.status(200).json(serviceResponse.data);
  }
}

export default MatchController;
