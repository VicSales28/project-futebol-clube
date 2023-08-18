import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { homeLeaderboard, awayLeaderboard } from './mocks/Leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota GET /leaderboard/home', () => {
  afterEach(sinon.restore);

  it('Testa retorno com as informações do desempenho dos times da casa', async () => {
    const { status, body } = await chai.request(app).get('/leaderboard/home');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(homeLeaderboard);
  });

  it('Testa retorno com as informações do desempenho dos times visitantes', async () => {
    const { status, body } = await chai.request(app).get('/leaderboard/away');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(awayLeaderboard);
  });
});