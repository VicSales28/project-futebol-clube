export const sampleMatches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 2,
    homeTeamId: 9,
    homeTeamGoals: 1,
    awayTeamId: 14,
    awayTeamGoals: 1,
    inProgress: false,
  },
  {
    id: 3,
    homeTeamId: 4,
    homeTeamGoals: 3,
    awayTeamId: 11,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 4,
    homeTeamId: 3,
    homeTeamGoals: 0,
    awayTeamId: 2,
    awayTeamGoals: 0,
    inProgress: false,
  },
  {
    id: 5,
    homeTeamId: 7,
    homeTeamGoals: 1,
    awayTeamId: 10,
    awayTeamGoals: 1,
    inProgress: false,
  },
];

export const matchInProg = {
  id: 41,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 9,
  awayTeamGoals: 0,
  inProgress: true,
  homeTeam: {
    teamName: 'São Paulo'
  },
  awayTeam: {
    teamName: 'Internacional'
  }
}

export const matchFinished = {
  id: 5,
  homeTeamId: 7,
  homeTeamGoals: 1,
  awayTeamId: 10,
  awayTeamGoals: 1,
  inProgress: false,
}