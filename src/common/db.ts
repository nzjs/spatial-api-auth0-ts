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

// module.exports = {
//   query: (text: string, params: any) => pool.query(text, params),
// }

module.exports = {
  query: async (text: string, params: any) => {
    const start = Date.now();
    const pool_query = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('----------------------------------');
    console.log('Executed query: ', 
      new Date().toLocaleString('en-AU'), 
      { text, params, duration }
    );
    return pool_query;
  }
}