import "reflect-metadata";
// import { DataSource } from "typeorm";
import { Projects } from "./entities/Projects";
import path from "path";
import "dotenv/config";

// export const AppDataSource = new DataSource({
//   type: "postgres",
//   host: process.env.DB_HOST,
//   port: 11732,
//   username: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   synchronize: true,
//   logging: true,
//   entities: [Projects],
//   migrations: [],
//   subscribers: [],
//   extra: {
//     ssl: {
//       rejectUnauthorized: false,
//       ca: readFileSync(path.join(__dirname, "../../ca.pem")).toString(),
//     },
//   },
// });

// (async () => {
//   try {
//     if (!AppDataSource.isInitialized) {
//       await AppDataSource.initialize();
//     }
//     console.log("Database connection successful");
//   } catch (error) {
//     console.error("Database connection failed:", error);
//   }
// })();
import { createConnection } from "typeorm";
import "reflect-metadata";
import { readFileSync } from "fs";
import { Users } from "./entities/Users";
import { Categories } from "./entities/Categories";

let connection: any = null;
export const connectToDatabase = async () => {
  if (connection) {
    return connection;
  }
  try {
     connection = await createConnection({
      type: "postgres",
      host: process.env.DB_HOST,
      port: 11732,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [Projects,Users,Categories],
      migrations: [],
      subscribers: [],
      
      extra: {
        ssl: {
          rejectUnauthorized: false,
          ca: readFileSync(path.join(process.cwd(), "ca.pem")).toString(),
        },
      },
    });
    console.log(process.env.DB_HOST);
    
    console.log("Connected to the database");
    return connection;
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};
