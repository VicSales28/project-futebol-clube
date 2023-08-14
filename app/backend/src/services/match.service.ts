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

  public async markMatchAsFinished(id: number):
  Promise<ServiceResponse<{ message: string }>> {
    const match = await this.matchModel.findById(Number(id));

    if (!match) {
      return { status: 'NOT_FOUND', data: { message: `Match ${id} was not located` } };
    }

    const finishedMatch = await this.matchModel.markMatchAsFinished(id);

    if (!finishedMatch) {
      return { status: 'CONFLICT', data: { message: `Match ${id} is already in its final state` } };
    }

    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async modifyMatchInProg(id: number, data: IMatch):
  Promise<ServiceResponse<{ message: string }>> {
    const matchFound = await this.matchModel.findById(id);

    if (!matchFound) {
      return { status: 'NOT_FOUND', data: { message: `Match ${id} was not located` } };
    }

    if (!matchFound.inProgress) {
      return {
        status: 'UNAUTHORIZED',
        data: { message: 'Updates are only allowed for matches in progress' },
      };
    }

    await this.matchModel.modifyMatchInProg(id, data);

    return { status: 'SUCCESSFUL', data: { message: 'Match successfully updated' } };
  }
}

export default TeamService;
