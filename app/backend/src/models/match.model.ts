import { IMatch } from '../Interfaces/matches/IMatch';
import { IMatchModel } from '../Interfaces/matches/IMatchModel';
import TeamModel from '../database/models/TeamModel';
import Model from '../database/models/MatchModel';
import { ExcludingId } from '../Interfaces/types/ExcludingId';

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

  /**

Busca uma partida pelo seu ID.
@param matchId O ID da partida a ser encontrada.
@returns As informações da partida encontrada ou null se não encontrada.
*/
  async findById(matchId: IMatch['id']): Promise<IMatch | null> {
  // Utiliza o método findByPk para buscar informações da partida pelo ID.
    const matchFound = await this.model.findByPk(matchId);

    // Verifica se matcheFound é nulo (partida não encontrada) e retorna null.
    if (matchFound == null) {
      return null;
    }

    // Retorna as informações da partida encontrada.
    return matchFound;
  }

  /**

Finaliza uma partida pelo seu ID, atualizando seu status para "finalizada".
@param id O ID da partida a ser finalizada.
@returns As informações da partida finalizada ou null se não encontrada ou atualização sem êxito.
*/
  async markMatchAsFinished(id: number): Promise<IMatch | null> {
  // Busca as informações da partida pelo ID usando a função findById.
    const matchToFinish = await this.findById(id);

    // Verifica se a partida não foi encontrada.
    if (!matchToFinish) {
      return null; // Partida não encontrada, retorna null.
    }
    const [affectedRows] = await this.model.update(
      { inProgress: false }, // Define o novo status da partida.
      { where: { id } }, // Especifica qual partida será atualizada com base no ID.
    );

    // Verifica se a atualização teve êxito.
    if (affectedRows === 0) {
      return null; // A atualização não teve êxito, retorna null.
    }
    console.log('Atualização feita'); // Indica que a atualização foi feita.

    // Retorna as informações da partida que foi finalizada.
    return matchToFinish;
  }

  /**

Atualiza uma entidade pelo ID, excluindo a propriedade 'id' do novo objeto de informações.
@param id - O ID da entidade a ser atualizada.
@param newInfo - As novas informações da entidade, excluindo a propriedade 'id'.
@returns Uma Promise que resolve para a entidade atualizada ou null se a atualização falhar.
*/
  async modifyMatchInProg(id: number, newInfo: Partial<ExcludingId<IMatch>>)
    : Promise<IMatch | null> {
  // Atualiza a entidade no banco de dados.
    const [affectedRows] = await this.model.update(newInfo, { where: { id } });

    // Verifica se a atualização teve êxito.
    if (affectedRows === 0) {
      return null; // A atualização não teve êxito, retorna null.
    }

    // Exibe uma mensagem para indicar que a atualização foi feita.
    console.log('Atualização feita');

    // Retorna a entidade atualizada.
    return this.findById(id);
  }

  /**
  Cria um novo objeto de partida (match) com os dados fornecidos.
  @param newMatch - Os dados necessários para criar a partida.
  @returns Uma promessa que resolve com o objeto de partida recém-criado.
  */
  async create(newMatch: ExcludingId<IMatch>): Promise<IMatch> {
    // Cria um novo objeto de partida com os dados fornecidos e define o status como 'inProgress: true'.
    const matchCreated = await this.model.create({ ...newMatch, inProgress: true });

    // Retorna o novo objeto de partida criado.
    return matchCreated;
  }
}

// Funções findAll e findByQuery desenvolvidas com ajuda de colegas (Req.16)

export default MatchModel;
