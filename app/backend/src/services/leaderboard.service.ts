import { getLeaderboardResults, orderResults } from '../utils/LeaderboardUtility';
import TeamModel from '../database/models/TeamModel';
import MatchesModel from '../database/models/MatchModel';
import ILeaderBoard from '../Interfaces/leaderboard/ILeaderBoard';

class LeaderboardService {
  protected modelMatches = MatchesModel;
  protected modelTeams = TeamModel;

  async getRankHome(): Promise<ILeaderBoard[]> {
    // Buscar todas as equipes
    const teams = await this.modelTeams.findAll();

    // Buscar todas as partidas concluídas
    const completedMatches = await this.modelMatches.findAll({ where: { inProgress: false } });

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
    const teams = await this.modelTeams.findAll();

    const completedMatches = await this.modelMatches.findAll({ where: { inProgress: false } });

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
