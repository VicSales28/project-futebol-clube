import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { homeLeaderboard, awayLeaderboard } from './mocks/Leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota GET /leaderboard/home', () => {
  afterEach(sinon.restore);

  it('deve retornar informações do desempenho dos times da casa', async () => {
    // Act
    const response = await chai.request(app).get('/leaderboard/home');

    // Assert
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(homeLeaderboard);
  });
});

describe('Rota GET /leaderboard/away', () => {
  afterEach(sinon.restore);

  it('deve retornar informações do desempenho dos times visitantes', async () => {
    // Act
    const response = await chai.request(app).get('/leaderboard/away');

    // Assert
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(awayLeaderboard);
  });
});
