import { ITeam } from './ITeam';

export interface ITeamModel {
  findAll(): Promise<ITeam[]>,
}
// Trecho acima garante que qualquer classe que implemente ITeamModel forneça o método findAll()
