import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  host: 'db',
  port: 5432,
  user: process.env.POSTGRES_USER || 'myuser',
  password: process.env.POSTGRES_PASSWORD || 'mypassword',
  database: process.env.POSTGRES_DB || 'mydb',
});

export default pool;
