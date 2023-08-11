import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import MatchModel from '../database/models/MatchModel';
import { sampleMatches } from './mocks/Matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes envolvendo as partidas', () => {
  afterEach(sinon.restore);

  it('Testa GET /matches para retornar todos as partidas', async function () {
    const builtMatches = MatchModel.build(sampleMatches as any);
    sinon.stub(MatchModel, 'findAll').resolves(builtMatches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(sampleMatches);
  });
});
