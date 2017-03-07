import * as path from "path";
import { Connection, DriverOptions, EntityManager, createConnection, Repository } from "typeorm";

export class OrmHelper {

  private static instance: OrmHelper;

  private configs = require('../../config/database.json');
  private connection: Connection;

  private constructor() {
  }

  public static getInstance(): OrmHelper {
    if (this.instance == null)
      this.instance = new OrmHelper();
    return this.instance;
  }

  public establishConnection(): Promise<any> {
    let nodeEnv: string = process.env.NODE_ENV || "development";
    let config: JSON = this.configs[nodeEnv];

    let adapter: string = config["adapter"];
    let host: string = config["host"] || "localhost";
    let port: number = config["port"] || 0;
    let user: string = config["user"];
    let password: string = config["password"];
    let database: string = config["database"];

    if (user.startsWith('$'))
      user = process.env[user.split("$")[1]];

    if (password.startsWith("$"))
      password = process.env[password.split("$")[1]];

    if (database.startsWith("$"))
      database = process.env[database.split("$")[1]];


    if (!user || !password || !database)
      throw new Error("Insufficient credentials, make sure that you export it as environment variables.");


    let driverOptions: DriverOptions;

    if (adapter == "mysql") {
      driverOptions = {
        type: adapter,
        host: host,
        port: port || 3306,
        username: user,
        password: password,
        database: database
      }

    } else if (adapter == "postgres") {
      driverOptions = {
        type: adapter,
        host: host,
        port: port || 5432,
        username: user,
        password: password,
        database: database
      }
    }

    return new Promise((resolve, reject) => {
      if (this.connection)
        return resolve();

      createConnection({
        driver: driverOptions,
        entities: [
          path.join(__dirname, "../api/model/*.js")
        ],
        autoSchemaSync: true,

      }).then((conn) => {
        this.connection = conn;
        resolve()

      }).catch((error) => {
        reject(error);
      });
    });
  }

  public getEntityManager(): EntityManager {
    return this.connection.entityManager;
  }
}
