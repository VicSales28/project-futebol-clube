import { Router } from 'express';
import teamRouter from './team.router';

const router = Router();

router.use('/teams', teamRouter);
// Esse trecho agrupa rotas relacionadas a equipes (/teams) criadas no arquivo de roteador team.router

export default router;
