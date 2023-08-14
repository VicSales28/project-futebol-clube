import { IMatch } from './IMatch';

export interface IMatchModel {
  findAll(inProg: string | undefined): Promise<IMatch[]>,
  findByQuery(inProg?: string): Promise<IMatch[]>,
  findById(id: IMatch['id']): Promise<IMatch | null>,
  markMatchAsFinished(id: number): Promise<IMatch | null>,
}
