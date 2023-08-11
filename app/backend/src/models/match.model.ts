import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import TeamModel from '../database/models/TeamModel';
import Model from '../database/models/MatchModel';

class MatchModel implements IMatchModel {
  private model = Model;

  /**
Consulta todas as partidas com base em um filtro.
@param inProg - Valor opcional que indica se as partidas em andamento devem ser filtradas.
@returns Uma matriz de partidas que atendem aos critérios de filtro.
  */
  async findAll(inProg: string | undefined): Promise<IMatch[]> {
  // Consulta partidas com base no filtro de andamento fornecido
    const matchesFound = await this.findByQuery(inProg);

    // Mapea as partidas encontradas para um novo formato selecionando propriedades específicas
    const formattedMatches = matchesFound.map(({ id, homeTeamId, homeTeamGoals,
      awayTeamId, awayTeamGoals, inProgress, homeTeam, awayTeam }
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

    return formattedMatches; // Retorna as partidas no novo formato
  }

  /**
Consulta partidas com base em um filtro.
@param inProg - Valor opcional que indica se as partidas em andamento devem ser filtradas.
Caso seja uma string "true", as partidas em andamento serão filtradas. Caso contrário, todas as partidas serão retornadas.
@returns Uma matriz de partidas que atendem aos critérios de filtro.
  */
  async findByQuery(inProg?: string): Promise<IMatch[]> {
    // O operador ternário verifica se 'inProg' é fornecido e, se sim, converte-o em um valor booleano automaticamente para o filtro 'inProgress'.
    const matchesQueryOptions = inProg ? { inProgress: inProg === 'true' } : {};

    // Realizar a consulta ao banco de dados para encontrar partidas
    const matchesFound = await this.model.findAll({
      include: [
        // Incluir informações da equipe da casa, excluindo o atributo 'id'
        { model: TeamModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        // Incluir informações da equipe visitante, excluindo o atributo 'id'
        { model: TeamModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
      where: matchesQueryOptions, // Aplica as opções de consulta
    });

    return matchesFound; // Retorna as partidas encontradas
  }
}

// Funções findAll e findByQuery desenvolvidas com ajuda de colegas (Req.16)

export default MatchModel;
