import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/SequelizeTeamsModel';
import { allTeams, firstTeam } from './mocks/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes envolvendo os times', () => {
  afterEach(sinon.restore);

  it('deve retornar todos os times ao acessar GET /teams', async () => {
    // Arrange
    sinon.stub(TeamModel, 'findAll').resolves(allTeams as any);

    // Act
    const response = await chai.request(app).get('/teams');

    // Assert
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(allTeams);
  });

  it('deve retornar um time específico ao acessar GET /teams/:id', async () => {
    // Arrange
    sinon.stub(TeamModel, 'findByPk').resolves(firstTeam as any);

    // Act
    const response = await chai.request(app).get('/teams/1');

    // Assert
    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal(firstTeam);
  });

  it('deve retornar status 404 e mensagem de erro ao acessar GET /teams/:id para um time não encontrado', async () => {
    // Arrange
    sinon.stub(TeamModel, 'findByPk').resolves(null);

    // Act
    const response = await chai.request(app).get('/teams/50');

    // Assert
    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Team not found');
  });
});
