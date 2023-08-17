import { Request, Response } from 'express';
import MatchService from '../services/match.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class MatchController {
  constructor(
    private matchService = new MatchService(),
  ) {}

  public async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const serviceResponse = await this.matchService.findAll(inProgress as string | undefined);
    res.status(200).json(serviceResponse.data);
  }

  public async markMatchAsFinished(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchService.markMatchAsFinished(Number(id));

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(200).json(serviceResponse.data);
  }

  public async modifyMatchInProg(req: Request, res: Response) {
    const { id } = req.params;

    const serviceResponse = await this.matchService.modifyMatchInProg(Number(id), req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    res.status(200).json(serviceResponse.data);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.matchService.create(req.body);

    if (serviceResponse.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    return res.status(201).json(serviceResponse.data);
  }
}

export default MatchController;
