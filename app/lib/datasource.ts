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
import { Leads } from "./entities/Leads";
import { Education } from "./entities/Education";

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
      entities: [Projects, Users, Categories, Leads, Education],
      migrations: [],
      subscribers: [],

      extra: {
        ssl: {
          rejectUnauthorized: false,
          ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUOsV7MFbPZdIlK9k2SBTJXYGTxqIwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMDI3YjQwNzMtYmViMy00YjU1LTliODktNWRlOTJmMDI4
ZGQ3IFByb2plY3QgQ0EwHhcNMjQxMjA3MTY1NDA4WhcNMzQxMjA1MTY1NDA4WjA6
MTgwNgYDVQQDDC8wMjdiNDA3My1iZWIzLTRiNTUtOWI4OS01ZGU5MmYwMjhkZDcg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAOo49gsx
P8GPYT6kcgDkLKbehDxYXzoquIrXrsnpM4BATocbPPcVeENQ+P8DCzPIUxNCG5uM
9rgy9QECyHlil8ZZTLcpcav/GmajRDDRzcp5DxrZ/GnU8baLu2daDMUmTxOmHevE
qn4qhnrXpCss17xnNalOwtQS3eljaROuvA+wjvZrwoBhcw8sVjQLqwDxRvIp674R
UYVeyHaqmydY1RFFL30N0biMAymkhttGCebndII6oAxRgBpSg84KcqwJEwttVngc
ux0FuD6T7NlLtJUbOUVk5CHTwUl7en/e8rt3c+rji/z2t1URbEJRj69NRRyT/3iW
snYCMdV3Gknlv2ci/yt/pUIn4+c7E9RmJGMFWaSMCEGBkyw7rOP/2L4a3ijMG/1t
xuLEJfAZ04bi8KcIsKxmQLssWZP2+ufJ4V8YcNV8PMNkWciFKrKlHUGEK8eNw/ob
ra2f0ObnTxloUcRHccZ7gwdo0nvISWWjDGWudPFIHVJvUnHVEPexpGhuRQIDAQAB
oz8wPTAdBgNVHQ4EFgQUPma9SA2BmJBDspYL4GfYs7umjzgwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAKPpOt+Ttr2fCP1g
2Vmz0dt/HTpodmRVq+amM58JWDyB93W0Cey/F9H833QPU3G1fZHyj//vFXmUPnOO
AtUN22Y5z6p77EU8f+GdHx39XuCbwmAql+p6vYPgJ0wyr+m8LxUdmXjdTRQiM4gH
ss7ByiFw7a1cfFwG3VaiCPLgFe/h9aD1YIhjV7ftzrAI7+O8ihyRcnu/90FD01zL
MR8/IZkY2BHdsxBsqvnFwi0zQe9uPoL7LRikXDz8vAGeNLheHEgAmbp+B+M5pDqW
c4ykX9VNKPa6wKeaPmv9IVQa2mF8CLdGYZdCCoXBhPHbXUNKcFkSc1q/4np5DcvC
xPBQDmYI3iQIvwN24M7t5kcbIC6o/PytNzNljJMYSkSs8ovnlzxBp6AR8pNUHFKH
6f7hf73S9Z6pBvTMhXqidepUzCFNtTMQrRUQOW3VWOV5IY/uNq10kzfT/Tdk5xap
3LFYvqvvjKtIwxZU+d2r+FWi4xE0m3001bxRRIBCTXl6ujUlxw==
-----END CERTIFICATE-----
`,
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
