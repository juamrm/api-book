import { Sequelize } from "sequelize";
//import dotenv from "dotenv";
import {
  DB_HOST,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_TEST_NAME,
} from "../config.js";

const connectionDb = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false, // Optional: disable logging queries to the console
});
export default connectionDb;
