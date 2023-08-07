import { Request, Router, Response } from 'express';
import TeamController from '../controllers/team.controller';

const teamController = new TeamController();

const router = Router();

router.get('/', (req: Request, res: Response) => teamController.findAll(req, res));
// Rota GET: para o caminho /teams que chama o método findAll do teamController e passa os objetos req e res (representando a solicitação e a resposta HTTP) como argumentos

export default router;
