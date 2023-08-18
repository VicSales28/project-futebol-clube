import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/SequelizeUsersModel';
import {
  adminToken,
  invalidEmailCredentials,
  invalidPasswordCredentials,
  noEmailCrendentials,
  noPasswordCrendentials,
  unregisteredEmailCredentials,
  unregisteredPasswordCredentials,
  validUser,
  validUserCredentials,
} from './mocks/Auth.mock';
import JWTUtility from '../utils/JWTUtility';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota POST /login', () => {
  afterEach(sinon.restore);

  it('deve permitir acesso com credenciais válidas', async () => {
    // Arrange
    sinon.stub(bcrypt, 'compareSync').returns(true);
    sinon.stub(UserModel, 'findOne').resolves(validUser as UserModel);

    // Act
    const response = await chai.request(app)
      .post('/login')
      .send(validUserCredentials);

    // Assert
    expect(response).to.have.status(200);
    expect(response.body).to.haveOwnProperty('token');
  });

  it('deve lidar com email inválido', async () => {
    // Act
    const response = await chai.request(app)
      .post('/login')
      .send(invalidEmailCredentials);

    // Assert
    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('deve lidar com senha de tamanho insuficiente', async () => {
    // Act
    const response = await chai.request(app)
      .post('/login')
      .send(invalidPasswordCredentials);

    // Assert
    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('deve lidar com falta de email', async () => {
    // Act
    const response = await chai.request(app)
      .post('/login')
      .send(noEmailCrendentials);

    // Assert
    expect(response).to.have.status(400);
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('deve lidar com falta de senha', async () => {
    // Act
    const response = await chai.request(app)
      .post('/login')
      .send(noPasswordCrendentials);

    // Assert
    expect(response).to.have.status(400);
    expect(response.body).to.deep.equal({ message: 'All fields must be filled' });
  });

  it('deve lidar com email válido, mas não cadastrado', async () => {
    // Act
    const response = await chai.request(app)
      .post('/login')
      .send(unregisteredEmailCredentials);

    // Assert
    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });

  it('deve lidar com senha válida, mas não cadastrada', async () => {
    // Act
    const response = await chai.request(app)
      .post('/login')
      .send(unregisteredPasswordCredentials);

    // Assert
    expect(response).to.have.status(401);
    expect(response.body).to.deep.equal({ message: 'Invalid email or password' });
  });
});

describe('Testes da rota GET /login/role', () => {
  afterEach(sinon.restore);

  it('deve obter o papel do administrador com sucesso', async () => {
    // Arrange
    sinon.stub(JWTUtility, 'verify').returns(adminToken);

    // Act
    const response = await chai.request(app)
      .get('/login/role')
      .set('authorization', adminToken);

    // Assert
    expect(response).to.have.status(200);
    expect(response.body).to.have.property('role', 'admin');
  });

  it('deve lidar com token não encontrado', async () => {
    // Act
    const response = await chai.request(app).get('/login/role');

    // Assert
    expect(response).to.have.status(401);
    expect(response.body).to.have.property('message', 'Token not found');
  });

  it('deve lidar com token inválido', async () => {
    // Arrange
    sinon.stub(JWTUtility, 'verify').throws();

    // Act
    const response = await chai.request(app)
      .get('/login/role')
      .set('Authorization', 'invalid-token');

    // Assert
    expect(response).to.have.status(401);
    expect(response.body).to.have.property('message', 'Token must be a valid token');
  });
});
