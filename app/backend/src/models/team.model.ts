import { ITeam } from '../Interfaces/teams/ITeam'; // Define estrutura de dados da equipe
import { ITeamModel } from '../Interfaces/teams/ITeamModel'; // Esta interface possui o método findAll que retorna uma lista de objetos que seguem a estrutura definida em ITeam
import Model from '../database/models/TeamModel';

class TeamModel implements ITeamModel {
  private model = Model;
  // Essa propriedade interaje com o banco de dados

  async findAll(): Promise<ITeam[]> {
    // Retorna uma Promessa de um array de objetos que seguem à interface ITeam. Este método é responsável por buscar todas as equipes no banco de dados
    const teamsFound = await this.model.findAll();
    // Aguarda a conclusão da busca na propriedade ligada ao banco de dados
    return teamsFound.map(({ id, teamName }) => (
      { id, teamName }
    ));
    // Mapeia os resultados da busca para um novo array contendo apenas as propriedades id e teamName de cada equipe
  }
}

export default TeamModel;
