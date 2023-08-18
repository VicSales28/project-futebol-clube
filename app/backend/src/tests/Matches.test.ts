import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/SequelizeMatchesModel';
import { sampleMatches, matchInProg, matchFinished } from './mocks/Matches.mock';
import { adminToken } from './mocks/Auth.mock';
import JWTUtility from '../utils/JWTUtility';

chai.use(chaiHttp);

const { expect } = chai;

describe('Rota GET /matches', () => {
  afterEach(sinon.restore);

  it('deve retornar todas as partidas', async () => {
    // Arrange
    const builtMatches = MatchModel.build(sampleMatches as any);
    sinon.stub(MatchModel, 'findAll').resolves(builtMatches as any);

    // Act
    const response = await chai.request(app).get('/matches');

    // Assert
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(sampleMatches);
  });
});

describe('Rota PATCH /matches/:id/finish', () => {
  afterEach(sinon.restore);

  it('deve finalizar a partida com sucesso', async () => {
    // Arrange
    sinon.stub(MatchModel, 'update').resolves([1] as any);
    sinon.stub(MatchModel, 'findByPk').resolves(matchInProg as any);
    sinon.stub(JWTUtility, 'verify').returns(adminToken);

    // Act
    const response = await chai.request(app)
      .patch('/matches/41/finish')
      .set('authorization', adminToken);

    // Assert
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Finished');
  });

  it('deve lidar com id de partida não encontrado', async () => {
    // Arrange
    sinon.stub(MatchModel, 'findByPk').resolves(null);
    sinon.stub(JWTUtility, 'verify').returns(adminToken);

    // Act
    const response = await chai.request(app)
      .patch('/matches/999/finish')
      .set('authorization', adminToken);

    // Assert
    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Match 999 was not located');
  });

  it('deve lidar com id de partida já finalizada', async () => {
    // Arrange
    sinon.stub(MatchModel, 'update').resolves([0] as any);
    sinon.stub(MatchModel, 'findByPk').resolves(matchFinished as any);
    sinon.stub(JWTUtility, 'verify').returns(adminToken);

    // Act
    const response = await chai.request(app)
      .patch('/matches/5/finish')
      .set('authorization', adminToken);

    // Assert
    expect(response.status).to.equal(409);
    expect(response.body.message).to.equal('Match 5 is already in its final state');
  });
});
