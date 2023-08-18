import ILeaderBoard from '../Interfaces/leaderboard/ILeaderBoard';
import MatchesModel from '../database/models/MatchModel';

// A definição de tipos TypeGoals é utilizada para indicar e distinguir entre os dois tipos de gols: gols a favor do time (homeTeamGoals) e gols sofridos pelo time, marcado pelo adversário (awayTeamGoals)
type TypeGoals =
'homeTeamGoals' |
'awayTeamGoals';

// Essa função percorre a lista de partidas e, para cada partida, verifica quantos gols foram marcados pelo time. No final, a função retorna o total de gols ao longo de todas as partidas.
export const countGoals = (matches: MatchesModel[], goals: TypeGoals): number => {
  const totalGoals = matches.reduce((total, currentMatch) => total + currentMatch[goals], 0);
  return totalGoals;
};

// O objetivo da função calculateMatchResults é determinar quantas vitórias, derrotas e empates ocorreram com base nos gols marcados pelos times em casa (homeTeamGoals) e fora de casa (awayTeamGoals) em cada partida.
export const calculateMatchesResults = (matches: MatchesModel[], goalsTypes: TypeGoals[]) => {
  let victories = 0;
  let losses = 0;
  let draws = 0;

  matches.forEach((match) => {
    const homeGoals = match[goalsTypes[0]]; // Indica o primeiro tipo de gol na lista ('homeTeamGoals')
    const awayGoals = match[goalsTypes[1]]; // Indica o segundo tipo de gol na lista ('awayTeamGoals')

    if (homeGoals === awayGoals) {
      draws += 1;
    } else if (homeGoals > awayGoals) {
      victories += 1;
    } else {
      losses += 1;
    }
  });

  return { victories, losses, draws };
};

// O objetivo da função calculateTeamPoints é calcular quantos pontos um time ganhou em todas as partidas.
export const calculateTeamPoints = (matches: MatchesModel[], goalsTypes: TypeGoals[]): number => {
  const { victories, draws } = calculateMatchesResults(matches, goalsTypes);
  const totalPoints = (victories * 3) + draws;
  return totalPoints;
};

// O principal objetivo da função calculateGoalsDifference é calcular a diferença entre os gols marcados e os gols sofridos por um time em um conjunto de partidas de futebol.
export const calculateGoalsDifference = (
  matches: MatchesModel[],
  goalsTypes: TypeGoals[],
): number => {
  const goalsScored = countGoals(matches, goalsTypes[0]);
  const opponentGoals = countGoals(matches, goalsTypes[1]);

  const goalsDifference = goalsScored - opponentGoals;

  return goalsDifference;
};

// O objetivo da função calculateEfficiency é calcular a eficiência de um time em ganhar pontos em todas as partidas de futebol que ele jogou
export const calculateEfficiency = (matches: MatchesModel[], goals: TypeGoals[]): string => {
  const totalPoints = calculateTeamPoints(matches, goals);
  const totalGames = matches.length;
  const efficiency = (totalPoints / (totalGames * 3)) * 100;
  return efficiency.toFixed(2);
};

export const getLeaderboardResults = (
  teamname: string,
  matches: MatchesModel[],
  goals: TypeGoals[],
) => ({
  name: teamname,
  totalPoints: calculateTeamPoints(matches, goals),
  totalGames: matches.length,
  totalVictories: calculateMatchesResults(matches, goals).victories,
  totalDraws: calculateMatchesResults(matches, goals).draws,
  totalLosses: calculateMatchesResults(matches, goals).losses,
  goalsFavor: countGoals(matches, goals[0]),
  goalsOwn: countGoals(matches, goals[1]),
  goalsBalance: calculateGoalsDifference(matches, goals),
  efficiency: calculateEfficiency(matches, goals),
});

export const orderResults = (teams: ILeaderBoard[]) =>
  teams.sort((a, b) => {
    // 1. Ordenar por Total de Pontos (decrescente)
    if (b.totalPoints !== a.totalPoints) {
      return b.totalPoints - a.totalPoints;
    }

    // 2. Se Total de Pontos for igual, ordenar por Total de Vitórias (decrescente)
    if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories;
    }

    // 3. Se Total de Pontos e Total de Vitórias forem iguais, ordenar por Saldo de Gols (decrescente)
    if (a.goalsBalance !== b.goalsBalance) {
      return b.goalsBalance - a.goalsBalance;
    }

    // 4. Se Total de Pontos, Total de Vitórias e Saldo de Gols forem iguais, ordenar por Gols a Favor (decrescente)
    if (a.goalsFavor !== b.goalsFavor) {
      return b.goalsFavor - a.goalsFavor;
    }

    // 5. Se todas as condições acima forem iguais, ordenar por Gols Próprios (crescente)
    return a.goalsOwn - b.goalsOwn;
  });
