import MatchModel from '../models/match.model';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/types/ServiceResponse';

class TeamService {
  constructor(
    private matchModel = new MatchModel(),
  ) {}

  public async findAll(filter: string | undefined): Promise<ServiceResponse<IMatch[]>> {
    const allMatches = await this.matchModel.findAll(filter);

    return { status: 'SUCCESSFUL', data: allMatches };
  }
}

export default TeamService;
