import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';
import {
  invalidEmailCredentials,
  invalidPasswordCredentials,
  noEmailCrendentials,
  noPasswordCrendentials,
  unregisteredEmailCredentials,
  unregisteredPasswordCredentials,
  validUser,
  validUserCredentials,
} from './mocks/Auth.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes envolvendo login de acesso', () => {
  afterEach(sinon.restore);

  it('Testa POST /login para acesso com credenciais validas', async function () {
    sinon.stub(bcrypt, 'compareSync').returns(true);

    sinon.stub(UserModel, 'findOne').resolves(validUser as UserModel);

    const response = await chai.request(app).post('/login').send(validUserCredentials);

    expect(response).to.have.status(200);
    expect(response.body).to.haveOwnProperty('token');
  });

  it('Testa POST /login com email em formado inválido', async function () {
    const response = await chai.request(app).post('/login').send(invalidEmailCredentials);

    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' })
  });

  it('Testa POST /login com senha de tamanho insuficiente', async function () {
  const response = await chai.request(app).post('/login').send(invalidPasswordCredentials);

    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Testa POST /login sem informar email', async function () {
    const response = await chai.request(app).post('/login').send(noEmailCrendentials);

    expect(response).to.have.status(400);
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('Testa POST /login sem informar senha', async function () {
    const response = await chai.request(app).post('/login').send(noPasswordCrendentials);

    expect(response).to.have.status(400);
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' })
  });

  it('Testa POST /login com email em formato válido, mas não cadastrado no banco', async function () {
    const response = await chai.request(app).post('/login').send(unregisteredEmailCredentials);

    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('Testa POST /login com senha com formato válido, mas não cadastrada no banco', async function () {
    const response = await chai.request(app).post('/login').send(unregisteredPasswordCredentials);

    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });
});