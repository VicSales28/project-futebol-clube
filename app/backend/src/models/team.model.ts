import SequelizeTeamsModel from '../database/models/SequelizeTeamsModel';
import { ITeam } from '../Interfaces/teams/ITeam';
import { ITeamModel } from '../Interfaces/teams/ITeamModel';

class TeamModel implements ITeamModel {
  private sequelizeTeamsModel = SequelizeTeamsModel;
  // Essa propriedade interaje com o banco de dados

  async findAll(): Promise<ITeam[]> {
    // Retorna uma Promessa de um array de objetos que seguem à interface ITeam. Este método é responsável por buscar todas as equipes no banco de dados
    const teamsFound = await this.sequelizeTeamsModel.findAll();
    // Aguarda a conclusão da busca na propriedade ligada ao banco de dados
    return teamsFound.map(({ id, teamName }) => (
      { id, teamName }
    ));
    // Mapeia os resultados da busca para um novo array contendo apenas as propriedades id e teamName de cada equipe
  }

  async findById(id: ITeam['id']): Promise<ITeam | null> {
    // Recebe um parâmetro id do tipo ITeam['id']
    // Retorna uma Promessa que será resolvida com um objeto do tipo ITeam ou null
    const teamFound = await this.sequelizeTeamsModel.findByPk(id);
    // Aguarda a conclusão da busca do time usando o método "Find By Primary Key" da propriedade model
    if (teamFound == null) {
      return null;
    }
    // Esta linha verifica se não foi encontrada uma equipe com o ID fornecido
    const team: ITeam = {
      id: teamFound.id,
      teamName: teamFound.teamName,
    };
    // Cria um objeto team para armazenar as propriedades da equipe (id e teamName)
    return team;
  }
}

export default TeamModel;
