import * as express from 'express';
import routers from './routers';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.routers();
    // Inserido aqui no construtor para garantir que a configuração das rotas seja realizada assim que a instância do aplicativo for criada

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private routers(): void {
    this.app.use(routers);
  }
  // Este método routers() configura as rotas na aplicação

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number): void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
