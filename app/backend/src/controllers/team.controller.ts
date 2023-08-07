import { Request, Response } from 'express';
import TeamService from '../services/team.service';

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
}

export default TeamController;
