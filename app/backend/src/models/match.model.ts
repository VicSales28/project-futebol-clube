import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import TeamModel from '../database/models/TeamModel';
import Model from '../database/models/MatchModel';

class MatchModel implements IMatchModel {
  private model = Model;

  async findAll(): Promise<IMatch[]> {
    const modelResponse = await this.model.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return modelResponse.map(({ id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals,
      inProgress, homeTeam, awayTeam }
    : IMatch) => ({
      id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
      homeTeam,
      awayTeam,
    }));
  }
}

export default MatchModel;
