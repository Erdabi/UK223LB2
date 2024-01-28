import { Request, Response, Express } from 'express';
import { Database } from '../database';

export class API {
  app: Express;
  database: Database;

  constructor(app: Express, database: Database) {
    this.app = app;
    this.database = database;

    // Binden von 'this' an die Methoden
    this.app.get('/hello', this.sayHello);
    this.app.post('/login', this.login.bind(this));
    this.app.post('/register', this.register.bind(this));
  }

  private sayHello(req: Request, res: Response) {
    res.send('Hello There!');
  }

  private async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await this.database.getUser(username);
    if (user && user.password === password) {
      res.send('Login erfolgreich!');
    } else {
      res.status(401).send('Ungültige Anmeldedaten');
    }
  }

  private async register(req: Request, res: Response) {
    const { username, password } = req.body;
    const userExists = await this.database.getUser(username);
    if (userExists) {
      res.status(409).send('Benutzername bereits vergeben');
    } else {
      await this.database.createUser(username, password);
      res.send('Registrierung erfolgreich!');
    }
  }
}
