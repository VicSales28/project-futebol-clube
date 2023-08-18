import SequelizeMatchesModel from '../database/models/SequelizeMatchesModel';
import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import ILeaderBoard from '../Interfaces/leaderboard/ILeaderBoard';
import { getLeaderboardResults, orderResults } from '../utils/LeaderboardUtility';

class LeaderboardService {
  protected sequelizeMatchesModel = SequelizeMatchesModel;
  protected sequelizeTeamsModel = SequelizeTeamsModel;

  async getRankHome(): Promise<ILeaderBoard[]> {
    // Buscar todas as equipes
    const teams = await this.sequelizeTeamsModel.findAll();

    // Buscar todas as partidas concluídas
    const completedMatches = await
    this.sequelizeMatchesModel.findAll({ where: { inProgress: false } });

    // Array para armazenar os resultados da classificação
    const leaderBoardResults: ILeaderBoard[] = [];

    // Para cada equipe, calcular os resultados da classificação
    teams.forEach((team) => {
      // Filtrar as partidas em que a equipe atuou como time da casa
      const homeMatches = completedMatches.filter((match) => match.homeTeamId === team.id);

      // Calcular os resultados da classificação para a equipe
      const teamLeaderBoard = getLeaderboardResults(
        team.teamName,
        homeMatches,
        ['homeTeamGoals', 'awayTeamGoals'],
      );

      // Adicionar os resultados ao array de classificação
      leaderBoardResults.push(teamLeaderBoard);
    });

    // Ordenar os resultados da classificação de acordo com os critérios definidos
    return orderResults(leaderBoardResults);
  }

  async getRankAway(): Promise<ILeaderBoard[]> {
    const teams = await this.sequelizeTeamsModel.findAll();

    const completedMatches = await
    this.sequelizeMatchesModel.findAll({ where: { inProgress: false } });

    const leaderBoardResults: ILeaderBoard[] = [];

    teams.forEach((team) => {
      const awayMatches = completedMatches.filter((match) => match.awayTeamId === team.id);

      const teamLeaderBoard = getLeaderboardResults(
        team.teamName,
        awayMatches,
        ['awayTeamGoals', 'homeTeamGoals'],
      );

      leaderBoardResults.push(teamLeaderBoard);
    });

    return orderResults(leaderBoardResults);
  }
}

export default LeaderboardService;
