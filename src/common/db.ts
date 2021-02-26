/**
 * Imports
 */
import { env } from "process";
import * as dotenv from 'dotenv';
const { Pool } = require('pg');

dotenv.config();

/**
 * Database Pool Connection
 * https://node-postgres.com/features/pooling
 */
const pool = new Pool({
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT,
  database: process.env.DB_DBNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
})

module.exports = {
  query: (text: string, params: any) => pool.query(text, params),
}