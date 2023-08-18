import { Router } from 'express';
import teamRouter from './teams.router';
import authRouter from './auth.router';
import matchRouter from './matches.router';
import leaderboardRouter from './leaderboard.router';

const router = Router();

router.use('/teams', teamRouter);
// Esse trecho agrupa rotas relacionadas a equipes (/teams) criadas no arquivo de roteador team.router
router.use('/login', authRouter);
// Esse trecho agrupa rotas relacionadas ao login criadas no arquivo de roteador auth.router
router.use('/matches', matchRouter);
// Esse trecho agrupa rotas relacionadas as partifas (/matches) criadas no arquivo de roteador match.router
router.use('/leaderboard', leaderboardRouter);
// Esse trecho agrupa rotas relacionadas aos placeres (/leaderboard) criadas no arquivo de roteador leaderboard.router

export default router;
