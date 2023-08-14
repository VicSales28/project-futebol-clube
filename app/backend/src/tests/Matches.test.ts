import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { sampleMatches, matchInProg } from './mocks/Matches.mock';
import JWTUtility from '../utils/JWTUtility';
import { validUser } from './mocks/Auth.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes envolvendo as partidas', () => {
  afterEach(sinon.restore);

  // it('Testa GET /matches para retornar todos as partidas', async function () {
  //   const builtMatches = MatchModel.build(sampleMatches as any);
  //   sinon.stub(MatchModel, 'findAll').resolves(builtMatches as any);

  //   const { status, body } = await chai.request(app).get('/matches');

  //   expect(status).to.equal(200);
  //   expect(body).to.deep.equal(sampleMatches);
  // });

  it('deve retornar finalizar uma partida pelo id', async function() {
    sinon.stub(MatchModel, 'update').resolves([1] as any);
    sinon.stub(MatchModel, 'findByPk').resolves(matchInProg as any);
    sinon.stub(JWTUtility.prototype, 'verify').returns(validUser);


    const { status, body } = await chai.request(app)
    .patch('/matches/48/finish')
    .set('Authorization', 'token');

    expect(status).to.equal(200);
    expect(body.message).to.deep.equal('Finished');
  });

  it('não deve encontrar um id valido para atualizar', async function() {
    sinon.stub(MatchModel, 'findByPk').resolves(null);
    sinon.stub(JWTUtility.prototype, 'verify').returns(validUser);


    const { status, body } = await chai.request(app)
    .patch('/matches/0/finish')
    .set('Authorization', 'token');

    expect(status).to.equal(404);
    expect(body.message).to.deep.equal('Match 0 was not located');
  });

  it('deve dar conflito de update para finalizar uma partida', async function() {
    sinon.stub(MatchModel, 'update').resolves([0] as any);
    sinon.stub(MatchModel, 'findByPk').resolves(matchInProg as any);
    sinon.stub(JWTUtility.prototype, 'verify').returns(validUser);


    const { status, body } = await chai.request(app)
    .patch('/matches/3/finish')
    .set('Authorization', 'token');

    expect(status).to.equal(409);
    expect(body.message).to.deep.equal('Match 3 is already in its final state');
  });
});
