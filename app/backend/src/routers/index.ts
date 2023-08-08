import { Router } from 'express';
import teamRouter from './team.router';
import authRouter from './auth.router';

const router = Router();

router.use('/teams', teamRouter);
// Esse trecho agrupa rotas relacionadas a equipes (/teams) criadas no arquivo de roteador team.router
router.use('/login', authRouter);
// Esse trecho agrupa rotas relacionadas ao login criadas no arquivo de roteador auth.router

export default router;
