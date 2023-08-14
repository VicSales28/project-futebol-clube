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

  // public async markMatchAsFinished(matchId: string | number):
  // Promise<ServiceResponse<{ message: string }>> {
  //   try {
  //     await this.matchModel.markMatchAsFinished(matchId);

  //     return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  //   } catch (error) {
  //     return {
  //       status: 'CONFLICT',
  //       data: { message: `Failed to mark match ${matchId} as finished` },
  //     };
  //   }
  // }

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
}

export default TeamService;
