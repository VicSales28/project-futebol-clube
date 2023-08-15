import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { sampleMatches, matchInProg, matchFinished } from './mocks/Matches.mock';
import { adminToken } from './mocks/Auth.mock';
import JWTUtility from '../utils/JWTUtility';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota GET /matches', () => {
  afterEach(sinon.restore);

  it('Testa rota para retornar todos as partidas', async function () {
    const builtMatches = MatchModel.build(sampleMatches as any);
    sinon.stub(MatchModel, 'findAll').resolves(builtMatches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(sampleMatches);
  });
});

describe('Testa rota PATCH /matches/:id/finish', () => {
  afterEach(sinon.restore);

  it('Testa a rota com finalização bem sucedida', async function () {
    sinon.stub(MatchModel, 'update').resolves([1] as any);
    sinon.stub(MatchModel, 'findByPk').resolves(matchInProg as any);
    sinon.stub(JWTUtility, 'verify').returns(adminToken);

    const { status, body } = await chai.request(app)
      .patch('/matches/41/finish')
      .set('authorization', adminToken);

    expect(status).to.equal(200);
    expect(body.message).to.deep.equal('Finished');
  });

  it('Testa quando o id da partida não é encontrado', async function () {
    sinon.stub(MatchModel, 'findByPk').resolves(null);
    sinon.stub(JWTUtility, 'verify').returns(adminToken);

    const { status, body } = await chai.request(app)
      .patch('/matches/999/finish')
      .set('authorization', adminToken);

    expect(status).to.equal(404);
    expect(body.message).to.deep.equal('Match 999 was not located');
  });

  it('Testa quando o id já está atualizado', async function () {
    sinon.stub(MatchModel, 'update').resolves([0] as any);
    sinon.stub(MatchModel, 'findByPk').resolves(matchFinished as any);
    sinon.stub(JWTUtility, 'verify').returns(adminToken);

    const { status, body } = await chai.request(app)
      .patch('/matches/5/finish')
      .set('authorization', adminToken);

    expect(status).to.equal(409);
    expect(body.message).to.deep.equal('Match 5 is already in its final state');
  });
});
