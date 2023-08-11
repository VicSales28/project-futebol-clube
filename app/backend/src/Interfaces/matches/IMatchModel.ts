import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(inProg: string | undefined): Promise<IMatch[]>,
}
