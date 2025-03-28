import "reflect-metadata";
import { DataSource } from "typeorm";
import path from "path";
import { readFileSync } from "fs";
import { Projects } from "./entities/Projects";
import { Users } from "./entities/Users";
import { Categories } from "./entities/Categories";
import { Leads } from "./entities/Leads";
import { Education } from "./entities/Education";
import "dotenv/config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: 11732,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV !== "production",
  logging: true,
  entities: [Projects, Users, Categories, Leads, Education],
  extra: {
    // ssl: {
    //   rejectUnauthorized: false,
    //   ca: readFileSync(path.join(process.cwd(), "ca.pem")).toString(),
    // },
    ssl:
      process.env.NODE_ENV === "production"
        ? {
            rejectUnauthorized: false,
            ca:
              process.env.DB_CA_CERT ||
              readFileSync(path.join(process.cwd(), "ca.pem")).toString(),
          }
        : false,
  },
});
