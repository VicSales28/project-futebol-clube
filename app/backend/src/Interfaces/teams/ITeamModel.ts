import { ITeam } from './ITeam';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>,
  findById(id: ITeam['id']): Promise<ITeam | null>
}
// Trecho acima garante que qualquer classe que implemente ITeamModel forneça os métodos findAll(),findById(id),
