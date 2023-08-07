import TeamModel from '../models/team.model'; // Essa classe lida com operações de banco de dados relacionadas a equipes.
import { ITeam } from '../Interfaces/teams/ITeam';
import { ServiceResponse } from '../Interfaces/types/ServiceResponse'; // Define a estrutura de dados para uma resposta de serviço, que pode ser uma resposta de sucesso ou erro.

class TeamService {
  constructor(
    private teamModel = new TeamModel(),
    // Cria uma instância da classe TeamModel. Isso permite que a camada chame métodos da classe de model.
  ) {}

  public async findAll(): Promise<ServiceResponse<ITeam[]>> {
    // Retorna uma Promessa que envolve um objeto do tipo ServiceResponse contendo um array de objetos do tipo ITeam.
    const modelResponse = await this.teamModel.findAll();
    return { status: 'SUCCESSFUL', data: modelResponse };
  }
}

export default TeamService;
