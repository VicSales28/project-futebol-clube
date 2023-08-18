import { Request, Response } from 'express';
import TeamService from '../services/teams.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

// Controlador que lida com as requisições relacionadas a equipes
class TeamController {
  constructor(
    private teamService = new TeamService(),
    // Cria uma instância da classe TeamService. Isso permite que o controlador chame métodos da classe de serviço.
  ) {}

  public async findAll(_req: Request, res: Response) {
    // Ao definir o método como público, permite-se que outras partes acessem e chamem esse método
    const serviceResponse = await this.teamService.findAll();
    res.status(200).json(serviceResponse.data);
  }

  public async findById(req: Request, res: Response) {
    const { id } = req.params;
    // Chamando o serviço para buscar a equipe pelo ID
    const serviceResponse = await this.teamService.findById(Number(id));
    // Verificando se a resposta do serviço indica que a equipe não foi encontrada
    if (serviceResponse.status === 'NOT_FOUND') {
      // Se a equipe não foi encontrada, retorna um status de erro e os dados da resposta
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }
    res.status(200).json(serviceResponse.data);
  }
}

export default TeamController;
