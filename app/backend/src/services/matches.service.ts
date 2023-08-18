import MatchModel from '../models/match.model';
import { IMatch } from '../Interfaces/matches/IMatch';
import { ServiceResponse } from '../Interfaces/types/ServiceResponse';
import { ExcludingId } from '../Interfaces/types/ExcludingId';
import TeamsModel from '../models/team.model';

class MatchService {
  constructor(
    private matchModel = new MatchModel(),
    private teamsModel = new TeamsModel(),
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

  public async create(newMatch: ExcludingId<IMatch>): Promise<ServiceResponse<IMatch>> {
    const { awayTeamId, homeTeamId } = newMatch;

    if (awayTeamId === homeTeamId) {
      return {
        status: 'UNPROCESSABLE_CONTENT',
        data: { message: 'It is not possible to create a match with two equal teams' },
      };
    }

    const findHomeTeam = await this.teamsModel.findById(homeTeamId);
    const findAwayTeam = await this.teamsModel.findById(awayTeamId);

    if (!findHomeTeam || !findAwayTeam) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'There is no team with such id!' },
      };
    }
    const matchCreated = await this.matchModel.create(newMatch);

    return { status: 'SUCCESSFUL', data: matchCreated };
  }
}

export default MatchService;
