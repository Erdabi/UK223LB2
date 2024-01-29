import mariadb from 'mariadb';
import { Pool } from 'mariadb';
import { USER_TABLE, TWEET_TABLE, POST_TABLE } from './schema';

export class Database {
  private _pool: Pool;

  constructor() {
    this._pool = mariadb.createPool({
      database: process.env.DB_NAME || 'minitwitter',
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'minitwitter',
      password: process.env.DB_PASSWORD || 'supersecret123',
      connectionLimit: 5,
    });
    this.initializeDBSchema();
  }

  private initializeDBSchema = async () => {
    console.log('Initializing DB schema...');
    try {
    await this.executeSQL(USER_TABLE);
    console.log("User-Tabelle wurde erstellt oder existiert bereits.");
    }catch (err){
      console.error("Fehler beim Erstellen der User-Tabelle:", err);
    }

    try {
    await this.executeSQL(TWEET_TABLE);
    console.log("Tweet-Tabelle wurde erstellt oder existiert bereits.");
    }catch (err){
      console.error("Fehler beim Erstellen der Tweet-Tabelle:", err);
    }

    try {
      await this.executeSQL(POST_TABLE);
      console.log("Posts-Tabelle wurde erstellt oder existiert bereits.");
  } catch (err) {
      console.error("Fehler beim Erstellen der Posts-Tabelle:", err);
  }
  }

  public executeSQL = async (query: string, params?: any[]) => {
    try {
      const conn = await this._pool.getConnection();
      const res = await conn.query(query, params);
      conn.end();
      return res;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  public getUser = async (username: string): Promise<any> => {
    const query = `SELECT * FROM users WHERE username = ?`;
    try {
      const res = await this.executeSQL(query, [username]);
      return res[0];
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public createUser = async (username: string, password: string): Promise<any> => {
    const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
    try {
      const res = await this.executeSQL(query, [username, password]);
      return res;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  public addPost = async (text: string): Promise<any> => {
    const query = `INSERT INTO posts (text) VALUES (?)`;
    try {
        const res = await this.executeSQL(query, [text]);
        return res;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

public getPosts = async (): Promise<any> => {
  const query = `SELECT * FROM posts`;
  try {
      const res = await this.executeSQL(query);
      return res;
  } catch (err) {
      console.error('Fehler beim Abrufen der Posts:', err);
      throw err;
  }
}


}
