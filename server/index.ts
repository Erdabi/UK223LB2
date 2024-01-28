import express, { Express, Request, Response } from 'express';
import { API } from './api';
import { Database } from './database';
import { resolve, dirname } from 'path';

class Backend {
  private _app: Express;
  private _api: API;
  private _database: Database;
  private _env: string;

  public get app(): Express {
    return this._app;
  }

  constructor() {
    this._app = express();
    this._database = new Database();

    this.setupMiddlewares();
    this.setupStaticFiles();
    this.setupRoutes();

    this._api = new API(this._app, this._database); // Database-Instanz an die API übergeben, nachdem die Middleware eingerichtet wurde

    this.startServer();
  }

  private setupMiddlewares(): void {
    this._app.use(express.json()); // Wichtig für das Parsen von JSON Body-Anfragen
  }

  private setupStaticFiles(): void {
    this._app.use(express.static('client'));
  }

  private setupRoutes(): void {
    this._app.get('/', (req: Request, res: Response) => {
      const __dirname = resolve(dirname(''));
      res.sendFile(__dirname + '/client/index.html');
    });

    // Hinweis: Weitere Routen werden über die API-Klasse definiert
  }

  private startServer(): void {
    const port = process.env.PORT || 3000;
    this._app.listen(port, () => {
      console.log(`Server is listening on port ${port}!`);
    });
  }
}

const backend = new Backend();
export const viteNodeApp = backend.app;
