import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

import { allTeams, firstTeam } from './mocks/Teams.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes envolvendo os times', () => {
  afterEach(sinon.restore);

  it('Testa GET /teams para retornar todos os times', async function () {
    sinon.stub(TeamModel, 'findAll').resolves(allTeams as any);

    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeams);
  });

  it('Testa GET /teams/:id para retornar um time específico', async function () {
    sinon.stub(TeamModel, 'findByPk').resolves(firstTeam as any);

    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(firstTeam);
  });

  it('Testa GET /teams/:id quando o time não for encontrado', async function () {
    sinon.stub(TeamModel, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/50');

    expect(status).to.equal(404);
    expect(body.message).to.equal('Team not found');
  });
});
